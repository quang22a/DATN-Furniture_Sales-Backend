import { Category, Product, Rating, Bill, Billproduct } from "../models";
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
    await Category.findByIdAndDelete({ _id });
    const productCate = await Product.find({ categoryId: _id });
    productCate.map(async (item) => {
      await Promise.all([
        Product.findByIdAndDelete({ _id: item._id }), 
        Rating.deleteMany({productId: item._id}),
      ]);
      const bills = await Billproduct.find({productId: item._id});
      bills.map(async (item1) => {
        await Bill.findByIdAndDelete(item1.billId);
      })
    })
    return true;
  }
}
