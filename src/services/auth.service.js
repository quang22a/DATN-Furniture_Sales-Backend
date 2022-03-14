import { Staff, Customer, Account, IdCustomerLastest } from "../models";
import bcrypt from "bcryptjs";

export default class AuthThenticationService {
  async getAccount(arg) {
    const account = await Account.findOne(arg);
    return account;
  }

  async register(data, role) {
    // create new account
    const hash = await bcrypt.hash(data.password, 12);
    let acc = await Account.create({
      email: data.email,
      phone: data.phone,
      password: hash,
      role,
    });
    if (role == "customer") {
      const lastIds = await IdCustomerLastest.find();
      const createId = lastIds && lastIds.length > 0 ? lastIds[0].idRating + 1 : 1;
      await Customer.create({
        name: data.name,
        accountId: acc._id,
        email: data.email,
        phone: data.phone,
        address: data.address,
        idRating: createId,
      });
      await IdCustomerLastest.deleteMany({});
      await IdCustomerLastest.create({idRating: createId});
    }
    if (role == "staff")
      await Staff.create({
        name: data.name,
        accountId: acc._id,
        email: data.email,
        phone: data.phone,
        address: data.address,
      });
  }

  async updatePassword(_id, password, newPassword) {
    let user = await this.getAccount({ _id });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return false;

    const hash = await bcrypt.hash(newPassword, 12);

    await Account.findByIdAndUpdate({ _id }, { password: hash });
    return true;
  }
}
