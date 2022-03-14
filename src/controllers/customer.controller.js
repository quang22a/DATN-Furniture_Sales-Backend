import mongo from "mongoose";
import { HttpError } from "../utils";
import { CustomerService, AuthThenticationService } from "../services";
import { Customer } from "../models";

const customerService = new CustomerService();
const authService = new AuthThenticationService();

const getCustomers = async (req, res, next) => {
  const { page, take, search } = req.query;
  try {
    const data = await customerService.getCustomers(page, take, search);
    res.status(200).json({
      status: 200,
      msg: "Success",
      data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getCustomer = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await customerService.getCustomerById(id);
    res.status(200).json({
      status: 200,
      msg: "Success",
      data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteCustomer = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongo.Types.ObjectId.isValid(id))
      throw new HttpError("Id incorrect", 401);
    if (!(await customerService.deleteCustomer(id)))
      throw new HttpError("Customer not found", 400);
    res.status(200).json({
      status: 200,
      msg: "Success",
    });
  } catch (error) {
    next(error);
  }
};

const updateCustomer = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  try {
    if (!mongo.Types.ObjectId.isValid(id))
      throw new HttpError("Id không chính xác", 401);
    const user = await authService.getAccount({ phone: data.phone });
    if (user) {
      throw new HttpError(
        "Số điện thoại này đã được sử dụng cho tài khoản khác!",
        400
      );
    }
    if (!(await customerService.updateCustomer(id, data)))
      throw new HttpError("Không  tìm thấy người dùng", 400);
    res.status(200).json({
      status: 200,
      msg: "Success",
    });
  } catch (error) {
    next(error);
  }
};

const countCustomer = async (req, res, next) => {
  try {
    const data = await Customer.countDocuments();
    if (!data && data !== 0) throw new HttpError("Lỗi", 400);
    res.status(200).json({
      status: 200,
      msg: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const customerController = {
  getCustomers,
  getCustomer,
  deleteCustomer,
  updateCustomer,
  countCustomer,
};
