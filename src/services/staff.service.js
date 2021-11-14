import { Staff, Account } from "../models";
import { pagination } from "../utils";

export default class StaffService {
  async getStaff(id) {
    return await Staff.findOne(
      { accountId: id },
      {
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
        role: 0,
        roleId: 0,
      }
    );
  }
  async getStaffById(_id) {
    return await Staff.findOne(
      { _id },
      {
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
        role: 0,
        roleId: 0,
      }
    );
  }

  async update(_id, data) {
    if (!(await this.getStaff(_id))) return false;
    await Staff.findOneAndUpdate({ accountId: _id }, data);
    return true;
  }

  async getStaffs(page, take) {
    return await pagination(Staff, {}, page, take);
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
}
