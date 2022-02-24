import mongo from "mongoose";
import { checkout } from "superagent";

import { Bill, Billproduct, Product } from "../models";
import { pagination } from "../utils";

export default class BillService {
  async createBill(data) {
    const {
      customerId,
      name,
      email,
      phone,
      address,
      totalPrice,
      totalProduct,
      paymentMethod,
      paymentStatus,
      status,
      additional,
      listProducts,
    } = data;
    const bill = await Bill.create({
      customerId,
      name,
      email,
      phone,
      address,
      totalPrice,
      totalProduct,
      paymentMethod,
      paymentStatus,
      status,
      additional,
    });
    console.log('product: ', listProducts)
    listProducts.map(async (item) => {
      await Product.findOneAndUpdate({ _id: mongo.Types.ObjectId(item.productId) }, { $inc: { quantity: - item.quantity } });
    });
    const listProductsWithBillId = listProducts.map((item) => {
      return {
        ...item,
        billId: bill._id,
      };
    });
    await Billproduct.insertMany(listProductsWithBillId);
    return true;
  }

  async getProductOfBill(billId) {
    const bills = await Billproduct.aggregate([
      {
        $match: {
          billId: mongo.Types.ObjectId(billId),
        },
      },
      {
        $lookup: {
          from: "product",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $project: {
          __v: 0,
          "product.__v": 0,
        },
      },
    ]).sort({ updatedAt: -1 });
    return bills;
  }

  async update(_id, data) {
    if (!(await this.getBill(_id))) return false;
    await Bill.findOneAndUpdate({ _id }, data);
    return true;
  }

  async getBills(page, take, search) {
    const condition = {};
    if (search) condition["name"] = new RegExp(search, "i");
    return await pagination(Bill, condition, page, take);
  }

  async getBill(billId) {
    return await Bill.findOne({ _id: billId });
  }

  async getBillOfUser(id) {
    // let listBill = await Bill.find({ customerId: id });
    const listBill = await Bill.aggregate([
      {
        $match: {
          customerId: mongo.Types.ObjectId(id),
        },
      },
      {
        $project: {
          __v: 0,
          "product.__v": 0,
        },
      },
    ]).sort({ updatedAt: -1 });
    let data = [];
    for (let item of listBill) {
      const listProduct = await Billproduct.aggregate([
        {
          $match: {
            billId: mongo.Types.ObjectId(item._id),
          },
        },
        {
          $project: {
            __v: 0,
            "product.__v": 0,
          },
        },
      ]).sort({ createdAt: -1 });
      data.push({
        ...item,
        listProduct,
      });
    }
    return data;
  }

  async getBillOfMonth(listBill, month, year) {
    const idBills = listBill.map((item) => item._id);
    const data = await Billproduct.aggregate([
        {
          $match: {
            billId: { "$in": idBills },
            updatedAt: {
              $gte: new Date(year, month, 1),
              $lte: new Date(year, month + 1, 1),
            },
          },
        },
        {
          $lookup: {
            from: "product",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $lookup: {
            from: "bill",
            localField: "billId",
            foreignField: "_id",
            as: "bill",
          },
        },
        {
          $project: {
            __v: 0,
            status: 0,
            createdAt: 0,
          },
        },
      ]).sort({ createdAt: -1 });
    const result = [];
    data.map((item) => {
      let index = 0;
      const check = result.filter((item1, index1) => {
        if (item1.productId.toString() === item.productId.toString()) {
          index = index1;
        }
        return item1.productId.toString() === item.productId.toString();
      })
      if (check.length > 0) {
        result[index].quantity += item.quantity;
        result[index].price += item.price;
      } else {
        result.push(item);
      }
    })
    return result;
  }

  async deleteBill(_id) {
    const bill = await this.getBill(_id);
    if (!bill) return false;
    await Promise.all([
      Bill.findByIdAndDelete({ _id }),
      Billproduct.deleteMany({ billId: _id }),
    ]);
    return true;
  }
}
