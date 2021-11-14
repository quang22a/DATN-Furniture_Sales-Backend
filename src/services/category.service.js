import { Category, Product } from "../models";
import { pagination } from "../utils";

export default class CategoryService {
  async create(data) {
    return await Category.create(data);
  }
  async getCategory(_id) {
    return await Category.findOne(
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
    if (!(await this.getCategory(_id))) return false;
    await Category.findOneAndUpdate({ _id }, data);
    return true;
  }

  async getCategories(page, take) {
    return await pagination(Category, {}, page, take);
  }

  async getCategoriesTrending() {
    return await Category.find({ isTrending: true });
  }

  async deleteCategory(_id) {
    const category = await this.getCategory(_id);
    if (!category) return false;
    await Promise.all([
      Category.findByIdAndDelete({ _id }),
      Product.deleteMany({ categoryId: _id }),
    ]);
    return true;
  }
}
