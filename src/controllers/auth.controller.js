import { Account, Customer, Staff } from "../models";
import bcrypt from "bcryptjs";
import { HttpError, tokenEncode } from "../utils";
import {
  AuthThenticationService,
  CustomerService,
  StaffService,
} from "../services";
import _ from "lodash";
const authService = new AuthThenticationService();
const staffService = new StaffService();
const customerService = new CustomerService();
/**
 * @api {post} /api/v1/auth/register-iter register iter
 * @apiName Register Iter
 * @apiGroup Auth
 * @apiParam {String} email email's  iter account
 * @apiParam {String} password password's iter account
 * @apiParam {String} name name's iter
 * @apiSuccess {String} msg <code>Sign up success</code> if everything went fine.
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Sign up success"
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400
 *     {
 *       "status" : 400,
 *       "msg": "password length must be at least 6 characters long"
 *     }
 */

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

/**
 * @api {post} /api/v1/auth/register-company register company
 * @apiName Register company
 * @apiGroup Auth
 * @apiParam {String} email email's  company account
 * @apiParam {String} password password's company account
 * @apiParam {String} name name's company
 * @apiSuccess {String} msg <code>Sign up success</code> if everything went fine.
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Sign up success"
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400
 *     {
 *       "status" : 400,
 *       "msg": "password length must be at least 6 characters long"
 *     }
 */
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

/**
 * @api {post} /api/v1/auth/login login user
 * @apiName Login user
 * @apiGroup Auth
 * @apiParam {String} email email's  account
 * @apiParam {String} password password's account
 * @apiSuccess {String} msg <code>Success</code> if everything went fine.
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success"
 *         role : "iter"
 *         token : "xxx.xxx.xxx",
 *         name : "Le trung nam",
 * 		   image:"https://anh.png"
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400
 *     {
 *       "status" : 400,
 *       "msg": "Email or password is incorrect"
 *     }
 */
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
      name = info.name;
      image = info.image;
    } else if (role == "customer") {
      const info = await Customer.findOne({ accountId });
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

/**
 * @api {post} /api/v1/auth/update-password update password
 * @apiName Update password
 * @apiGroup Auth
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiParam {String} password current password's  account
 * @apiParam {String} newPassword new password's account
 * @apiSuccess {String} msg <code>Success</code> if everything went fine.
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success"
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400
 *     {
 *       "status" : 400,
 *       "msg": "password is incorrect"
 *     }
 */
const updatePassword = async (req, res, next) => {
  const { password, newPassword } = req.body;
  const { _id } = req.user;
  try {
    let user = await authService.getAccount({ _id });
    if (!user) throw new HttpError("User not found", 400);
    if (!(await authService.updatePassword(_id, password, newPassword)))
      throw new HttpError("password is incorrect", 400);
    res.status(200).json({
      status: 200,
      msg: "Success",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @api {get} /api/v1/auth/profile get profile
 * @apiName get profile
 * @apiGroup Auth
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code>
 * @apiSuccess {Object} user <code> Objects user</code>
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success",
 *         "user": {
                "_id": "601d07f259e12e126c0a2af4",
                "email": "yentth239@gmail.com",
                "name": "FPT",
                "roleId": "601b9d7cdae0a522ac960fe9"
            } 
            
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400
 *     {
 *       "status" : 401,
 *       "msg": "user not found""
 *     }
 */
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

/**
 * @api {patch} /api/v1/auth/profile update profile
 * @apiName update user profile
 * @apiGroup Auth
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiParam {String} name name's user
 * @apiParam {String} phone phone's user
 * @apiParam {String} image link image's user
 * @apiParam {String} address address's user
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code>
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success",
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 404
 *     {
 *       "status" : 404,
 *       "msg": "User not found"
 *     }
 */
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

export const authController = {
  registerStaff,
  registerCustomer,
  login,
  updatePassword,
  profile,
  updateProfile,
};
