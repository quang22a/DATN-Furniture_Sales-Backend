import mongo from "mongoose";
import { HttpError } from "../utils";
import { CustomerService } from "../services";

const getCustomers = async (req, res, next) => {
  const { page, take } = req.query;
  try {
    const data = await CustomerService.getCustomers(page, take);
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
    if (!(await CustomerService.deleteCustomer(id)))
      throw new HttpError("Customer not found", 400);
    res.status(200).json({
      status: 200,
      msg: "Success",
    });
  } catch (error) {
    next(error);
  }
};

export const customerController = {
  getCustomers,
  deleteCustomer,
};
