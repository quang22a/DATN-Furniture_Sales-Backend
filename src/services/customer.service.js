import { Customer, Account } from "../models";
import { pagination } from "../utils";

export default class CustomerService {
  async getCustomer(id) {
    return await Customer.findOne(
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
  async getCustomerById(_id) {
    return await Customer.findOne(
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
    if (!(await this.getCustomer(_id))) return false;
    await Customer.findOneAndUpdate({ accountId: _id }, data);
    return true;
  }

  async getCustomers(page, take) {
    return await pagination(Customer, {}, page, take);
  }

  async deleteCustomer(_id) {
    const customer = await this.getCustomerById(_id);
    if (!customer) return false;
    await Promise.all([
      Customer.findByIdAndDelete({ _id }),
      Account.findByIdAndDelete({ _id: customer.accountId }),
    ]);
    return true;
  }
}
