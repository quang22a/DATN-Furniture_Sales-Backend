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
      }
    );
  }

  async update(_id, data) {
    if (!(await this.getCategory(_id))) return false;
    await Category.findOneAndUpdate({ _id }, data);
    return true;
  }

  async getCategories() {
    return await Category.find();
  }

  async getCategoriesAdmin(page, take, search) {
    const condition = {};
    if (search) condition["name"] = new RegExp(search, "i");
    return await pagination(Category, condition, page, take);
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
