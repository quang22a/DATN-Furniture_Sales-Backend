import bcrypt from "bcryptjs";
import { tokenEncode, pagination, HttpError } from "../utils";
import { Admin } from "../models";
import mongo from "mongoose";

const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const account = await Admin.findOne({ username });
    if (!account)
      throw new HttpError("Tài khoản hoặc mật khẩu không chính xác", 400);
    const match = await bcrypt.compare(password, account.password);
    if (!match)
      throw new HttpError("Tài khoản hoặc mật khẩu không chính xác", 400);
    const data = {
      username,
      _id: account._id,
      role: account.role,
    };
    const token = tokenEncode(data);
    res.status(200).json({
      status: 200,
      msg: "Thành công",
      accessToken: token,
      role: account.role,
      username,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createMod = async (req, res, next) => {
  let { username, password } = req.body;
  username = username.toLowerCase();
  try {
    const mod = await Admin.findOne({ username }, { password: 0 });
    if (mod) throw new HttpError("username is exist", 400);
    const hash = await bcrypt.hash(password, 12);
    if (!hash) throw new HttpError("Fail", 400);
    await Admin.create({
      username,
      password: hash,
      role: "moderator",
    });

    res.status(200).json({
      status: 200,
      msg: "Create mod success",
    });
  } catch (error) {
    next(error);
  }
};

const getMods = async (req, res, next) => {
  const { page, take } = req.query;
  try {
    let data = await pagination(Admin, { role: "moderator" }, page, take, {
      password: 0,
      role: 0,
    });
    res.status(200).json({
      status: 200,
      msg: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const deleteMod = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongo.Types.ObjectId.isValid(id))
      throw new HttpError("id is incorrect", 400);
    const mod = await Admin.findById({ _id: id });
    if (!mod) throw new HttpError("Moderator not found!", 404);
    if (mod.role == "admin")
      throw new HttpError(`Can't delete admin account`, 401);
    await Promise.all([Admin.findByIdAndDelete({ _id: id })]);
    res.status(200).json({
      status: 200,
      msg: "Success",
    });
  } catch (error) {
    next(error);
  }
};

export const adminController = {
  createMod,
  login,
  getMods,
  deleteMod,
};
