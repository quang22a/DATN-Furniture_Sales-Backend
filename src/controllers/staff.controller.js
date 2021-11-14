import mongo from "mongoose";
import { HttpError } from "../utils";
import { StaffService } from "../services";

const getStaffs = async (req, res, next) => {
  const { page, take } = req.query;
  try {
    const data = await StaffService.getStaffs(page, take);
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

const deleteStaff = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongo.Types.ObjectId.isValid(id))
      throw new HttpError("Id incorrect", 401);
    if (!(await StaffService.deleteStaff(id)))
      throw new HttpError("Staff not found", 400);
    res.status(200).json({
      status: 200,
      msg: "Success",
    });
  } catch (error) {
    next(error);
  }
};

export const StaffController = {
  getStaffs,
  deleteStaff,
};
