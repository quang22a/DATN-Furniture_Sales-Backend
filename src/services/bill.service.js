import mongo from "mongoose";

import { Bill, Billproduct } from "../models";
import { pagination } from "../utils";

export default class BillService {
  async createBill(data) {
    const {
      customer,
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
      customer,
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
    const listProductsWithBillId = listProducts.map((item) => {
      return {
        ...item,
        billId: bill._id,
      };
    });
    await Billproduct.insertMany(listProductsWithBillId);
    return true;
  }

  async getBillOfCustomer(customerId) {
    return await Bill.findOne(
      { _id },
      {
        __v: 0,
      }
    );
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
