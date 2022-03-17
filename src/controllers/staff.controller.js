import mongo from 'mongoose';
import { HttpError } from '../utils';
import { StaffService, AuthThenticationService } from '../services';
import { Staff } from '../models';

const staffService = new StaffService();
const authService = new AuthThenticationService();

const getStaffs = async (req, res, next) => {
  const { page, take, search } = req.query;
  try {
    const data = await staffService.getStaffs(page, take, search);
    res.status(200).json({
      status: 200,
      msg: 'Success',
      data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getStaff = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await staffService.getStaffById(id);
    res.status(200).json({
      status: 200,
      msg: 'Success',
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
      throw new HttpError('Id incorrect', 401);
    if (!(await staffService.deleteStaff(id)))
      throw new HttpError('Staff not found', 400);
    res.status(200).json({
      status: 200,
      msg: 'Success',
    });
  } catch (error) {
    next(error);
  }
};

const updateStaff = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  try {
    if (!mongo.Types.ObjectId.isValid(id))
      throw new HttpError('Id incorrect', 401);
    const staff = await staffService.getStaffById(id);
    if (!staff) throw new HttpError('Không tìm thấy người dùng', 401);
    const user = await authService.getAccount({ phone: data.phone });
    if (user && JSON.stringify(user._id) !== JSON.stringify(staff.accountId)) {
      throw new HttpError(
        'Số điện thoại này đã được sử dụng cho tài khoản khác!',
        400
      );
    }
    if (!(await staffService.updateStaff(id, data)))
      throw new HttpError('Customer not found', 400);
    res.status(200).json({
      status: 200,
      msg: 'Success',
    });
  } catch (error) {
    next(error);
  }
};

const countStaff = async (req, res, next) => {
  try {
    const data = await Staff.countDocuments();
    if (!data && data !== 0) throw new HttpError('Lỗi', 400);
    res.status(200).json({
      status: 200,
      msg: 'Success',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const staffController = {
  getStaffs,
  getStaff,
  deleteStaff,
  updateStaff,
  countStaff,
};
