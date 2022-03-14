import { Account, Customer, Staff, Code } from "../models";
import bcrypt from "bcryptjs";
import { HttpError, tokenEncode, sendEmail, generate } from "../utils";
import {
  AuthThenticationService,
  CustomerService,
  StaffService,
} from "../services";
import _ from "lodash";
const authService = new AuthThenticationService();
const staffService = new StaffService();
const customerService = new CustomerService();

const registerStaff = async (req, res, next) => {
  let { email, phone } = req.body;
  email = email.toLowerCase();
  try {
    const user = await authService.getAccount({ email });
    const user1 = await authService.getAccount({ phone });
    if (user) {
      throw new HttpError("Email này đã được sử dụng cho tài khoản khác!", 400);
    }
    if (user1) {
      throw new HttpError(
        "Số điện thoại này đã được sử dụng cho tài khoản khác!",
        400
      );
    }
    await authService.register(req.body, "staff");
    res.status(200).json({
      status: 200,
      msg: "Sign up success",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const registerCustomer = async (req, res, next) => {
  let { email, phone } = req.body;
  email = email.toLowerCase();
  try {
    const user = await authService.getAccount({ email });
    const user1 = await authService.getAccount({ phone });
    if (user) {
      throw new HttpError("Email này đã được sử dụng cho tài khoản khác!", 400);
    }
    if (user1) {
      throw new HttpError(
        "Số điện thoại này đã được sử dụng cho tài khoản khác!",
        400
      );
    }
    await authService.register(req.body, "customer");

    res.status(200).json({
      status: 200,
      msg: "Sign up success",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  let { email, password } = req.body;
  email = email.toLowerCase();
  try {
    const user = await authService.getAccount({ email });
    if (!user) throw new HttpError("Tài khoản hoặc mật khẩu không đúng", 400);
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new HttpError("Tài khoản hoặc mật khẩu không đúng", 400);

    const role = user.role;
    let accountId = user._id;
    let name;
    let image;
    if (role == "staff") {
      const info = await Staff.findOne({ accountId });
      if (!info.isActive) {
        throw new HttpError("Tài khoản của bạn đã bị khóa", 401);
      }
      name = info.name;
      image = info.image;
    } else if (role == "customer") {
      const info = await Customer.findOne({ accountId });
      if (!info.isActive) {
        throw new HttpError("Tài khoản của bạn đã bị khóa", 401);
      }
      name = info.name;
      image = info.image;
    }

    let data = {
      email: user.email,
      _id: user._id,
      role: user.role,
      name,
      image,
    };
    const token = tokenEncode(data);
    res.status(200).json({
      status: 200,
      msg: "Đăng nhập thành công",
      role: data.role,
      accessToken: token,
      name,
      image,
      userId: user._id,
    });
  } catch (error) {
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  const { password, newPassword } = req.body;
  const { _id } = req.user;
  try {
    let user = await authService.getAccount({ _id });
    if (!user) throw new HttpError("Không tìm thấy người dùng", 400);
    if (!(await authService.updatePassword(_id, password, newPassword)))
      throw new HttpError("Mật khẩu cũ không chính xác", 400);
    res.status(200).json({
      status: 200,
      msg: "Success",
    });
  } catch (error) {
    next(error);
  }
};

const profile = async (req, res, next) => {
  const { role, _id } = req.user;
  try {
    let user = null;
    if (role == "customer") {
      user = await customerService.getCustomer(_id);
    } else if (role == "staff") {
      user = await staffService.getStaff(_id);
    }
    if (!user) throw new HttpError("user not found", 400);

    res.status(200).json({
      status: 200,
      msg: "Success",
      user,
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  const { role, _id } = req.user;
  let user = null;
  if (role == "customer") {
    user = await customerService.getCustomer(_id);
  } else if (role == "staff") {
    user = await staffService.getStaff(_id);
  }
  if (!user) throw new HttpError("user not found", 400);

  if (role == "customer") {
    await customerService.update(_id, req.body);
  } else if (role == "staff") {
    await staffService.update(_id, req.body);
  }
  res.status(200).json({
    status: 200,
    msg: "Success",
  });
};

const requestResetPassword = async (req, res, next) => {
  let { email } = req.body;
  try {
    const user = await Account.findOne({ email });
    if (!user) throw new HttpError("Email này chưa được đăng ký", 400);
    const code = generate();
    await sendEmail(code, email);
    await Promise.all([
      Code.deleteMany({ email }),
      Code.create({ email, code, accountId: user._id }),
    ]);
    res.status(200).json({
      status: 200,
      msg: "Mã xác nhận đã được gửi về email, vui lòng xác nhận trong vòng 5 phút",
    });
  } catch (error) {
    next(error);
  }
};

const confirmCode = async (req, res, next) => {
  let { email, code } = req.body;
  try {
    email = email.toLowerCase();
    const existCode = await Code.findOne({ email, code });
    if (!existCode)
      throw new HttpError("Mã xác nhận của bạn không chính xác", 400);
    res.status(200).json({
      status: 200,
      msg: "Success",
    });
  } catch (error) {
    next(error);
  }
};

const changePasswordReset = async (req, res, next) => {
  let { email, code, password } = req.body;
  try {
    email = email.toLowerCase();
    const existCode = await Code.findOne({ email, code });
    if (!existCode) throw new HttpError("Fail", 400);
    const hash = await bcrypt.hash(password, 12);
    await Promise.all([
      Account.findByIdAndUpdate(
        { _id: existCode.accountId },
        { password: hash }
      ),
      Code.findByIdAndDelete({ _id: existCode._id }),
    ]);
    res.status(200).json({
      status: 200,
      msg: "Mật khẩu đã được cập nhật",
    });
  } catch (error) {
    next(error);
  }
};

export const authController = {
  registerStaff,
  registerCustomer,
  login,
  updatePassword,
  profile,
  updateProfile,
  requestResetPassword,
  confirmCode,
  changePasswordReset,
};
