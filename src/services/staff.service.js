import { Staff, Account } from "../models";
import { pagination } from "../utils";

export default class StaffService {
  async getStaff(id) {
    return await Staff.findOne(
      { accountId: id },
      {
        __v: 0,
      }
    );
  }
  async getStaffById(_id) {
    return await Staff.findOne(
      { _id },
      {
        __v: 0,
      }
    );
  }

  async update(_id, data) {
    if (!(await this.getStaff(_id))) return false;
    await Promise.all([
      Staff.findOneAndUpdate({ accountId: _id }, data),
      Account.findByIdAndUpdate(
        { _id },
        { email: data.email, phone: data.phone }
      ),
    ]);
    return true;
  }

  async getStaffs(page, take, search) {
    const condition = {};
    if (search) condition["name"] = new RegExp(search, "i");
    return await pagination(Staff, condition, page, take);
  }

  async deleteStaff(_id) {
    const staff = await this.getStaffById(_id);
    if (!staff) return false;
    await Promise.all([
      Staff.findByIdAndDelete({ _id }),
      Account.findByIdAndDelete({ _id: staff.accountId }),
    ]);
    return true;
  }

  async updateStaff(_id, data) {
    const staff = await this.getStaffById(_id);
    if (!staff) return false;
    await Promise.all([
      Staff.findByIdAndUpdate({ _id }, data),
      Account.findByIdAndUpdate(
        { _id: staff.accountId },
        { email: data.email, phone: data.phone }
      ),
    ]);
    return true;
  }
}
