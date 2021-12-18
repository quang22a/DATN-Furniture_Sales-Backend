import { Customer, Account } from "../models";
import { pagination } from "../utils";

export default class CustomerService {
  async getCustomer(id) {
    return await Customer.findOne(
      { accountId: id },
      {
        __v: 0,
      }
    );
  }
  async getCustomerById(_id) {
    return await Customer.findOne(
      { _id },
      {
        __v: 0,
      }
    );
  }

  async update(_id, data) {
    if (!(await this.getCustomer(_id))) return false;
    await Customer.findOneAndUpdate({ accountId: _id }, data);
    return true;
  }

  async getCustomers(page, take, search) {
    const condition = {};
    if (search) condition["name"] = new RegExp(search, "i");
    return await pagination(Customer, condition, page, take);
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

  async updateCustomer(_id, data) {
    const customer = await this.getCustomerById(_id);
    if (!customer) return false;
    await Promise.all([
      Customer.findByIdAndUpdate({ _id }, data),
      Account.findByIdAndUpdate(
        { _id: customer.accountId },
        { email: data.email, phone: data.phone }
      ),
    ]);
    return true;
  }

  async registerSendEmail(accountId, receiveMail) {
    return await Customer.findOneAndUpdate({ accountId }, { receiveMail });
  }
}
