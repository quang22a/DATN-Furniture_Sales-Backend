import { Contact } from "../models";
import { pagination } from "../utils";

export default class ContactService {
  async create(data) {
    return await Contact.create(data);
  }

  async getContact(_id) {
    return await Contact.findOne(
      { _id },
      {
        __v: 0,
      }
    );
  }

  async update(_id, data) {
    if (!(await this.getContact(_id))) return false;
    await Contact.findOneAndUpdate({ _id }, data);
    return true;
  }

  async getContacts(page, take, search) {
    const condition = {};
    if (search) condition["name"] = new RegExp(search, "i");
    return await pagination(Contact, condition, page, take);
  }

  async deleteContact(_id) {
    const contact = await this.getContact(_id);
    if (!contact) return false;
    await Promise.all([Contact.findByIdAndDelete({ _id })]);
    return true;
  }
}
