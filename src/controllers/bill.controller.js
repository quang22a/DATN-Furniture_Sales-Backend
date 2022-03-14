import mongo from "mongoose";
import { HttpError } from "../utils";
import { BillService, ProductService } from "../services";
import { Bill } from "../models";

const billService = new BillService();
const productService = new ProductService();

const createBill = async (req, res, next) => {
  const data = req.body;
  try {
    data.listProducts.map(async (item) => {
      const product = await productService.getProduct(item.productId);
      if (!product)
        throw new HttpError(`Không tìm thấy sản phẩm ${item.productId}`, 400);
    });
    await billService.createBill(data);
    res.status(200).json({
      status: 200,
      msg: "Thành công",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getBills = async (req, res, next) => {
  const { page, take, search } = req.query;
  try {
    const data = await billService.getBills(page, take, search);
    res.status(200).json({
      status: 200,
      msg: "Thành công",
      data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getBill = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await billService.getBill(id);
    res.status(200).json({
      status: 200,
      msg: "Thành công",
      data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getProductOfBill = async (req, res, nex) => {
  const { id } = req.params;
  try {
    const data = await billService.getProductOfBill(id);
    res.status(200).json({
      status: 200,
      msg: "Thành công",
      data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateBill = async (req, res, nex) => {
  const { id } = req.params;
  const data = req.body;
  try {
    if (!mongo.Types.ObjectId.isValid(id))
      throw new HttpError("Không tìm thấy hóa đơn", 400);

    const product = await Bill.findOne({ _id: id }, { __v: 1 });
    if (!product) throw new HttpError("Không tìm thấy hóa đơn", 401);

    if (!(await billService.update(id, data)))
      throw new HttpError("Không tìm thấy hóa đơn", 404);
    res.status(200).json({
      status: 200,
      msg: "Thành công",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getRevenue = async (req, res, next) => {
  const { year } = req.query;
  try {
    const date = new Date();
    let month;
    if (parseInt(year) !== date.getFullYear()) {
      month = 11;
    } else {
      month = date.getMonth();
    }
    console.log(month);
    const listBillsOfYear = await Bill.find({
      updatedAt: {
        $gte: new Date(year, 1, 1),
        $lte: new Date(year, month + 1, 1),
      },
      status: true,
    });
    if (!listBillsOfYear) throw new HttpError("Lỗi", 401);
    const data = Array.from([...Array(month + 1)], (x) => 0);
    listBillsOfYear.map((item) => {
      data[item.updatedAt.getMonth()] += item.totalPrice;
    });
    res.status(200).json({
      status: 200,
      msg: "Thành công",
      data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteBill = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongo.Types.ObjectId.isValid(id))
      throw new HttpError("Id không chính xác", 401);
    if (!(await billService.deleteBill(id)))
      throw new HttpError("Không tìm thấy hóa đơn này", 400);
    res.status(200).json({
      status: 200,
      msg: "Thành công",
    });
  } catch (error) {
    next(error);
  }
};

export const billController = {
  createBill,
  getBills,
  getBill,
  getProductOfBill,
  updateBill,
  getRevenue,
  deleteBill,
};
