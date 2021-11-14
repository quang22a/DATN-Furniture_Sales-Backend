import { Product } from "../models";
import { pagination } from "../utils";

export default class ProductService {
  async create(data) {
    return await Product.create(data);
  }
  async getProduct(_id) {
    return await Product.findOne(
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
    if (!(await this.getProduct(_id))) return false;
    await Product.findOneAndUpdate({ _id }, data);
    return true;
  }

  async getProducts(page, take) {
    return await pagination(Product, {}, page, take);
  }

  async deleteProduct(_id) {
    const product = await this.getProduct(_id);
    if (!product) return false;
    await Promise.all([Product.findByIdAndDelete({ _id })]);
    return true;
  }
}
