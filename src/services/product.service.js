import { Product, IdProductLastest, Rating, Billproduct, Bill } from "../models";
import { pagination } from "../utils";

export default class ProductService {
  async create(data) {
    const lastIds = await IdProductLastest.find();
    const createId = lastIds && lastIds.length > 0 ? lastIds[0].idRating + 1 : 1;
    await Promise.all([Product.create({...data, idRating: createId}), IdProductLastest.deleteMany({}), IdProductLastest.create({idRating: createId})]);
    return true;
    // return await Product.create(data);
  }
  async getProduct(_id) {
    return await Product.findOne(
      { _id },
      {
        __v: 0,
      }
    );
  }

  async getProductByCategory(categoryId) {
    return await Product.find({ categoryId: categoryId });
  }

  async update(_id, data) {
    if (!(await this.getProduct(_id))) return false;
    await Product.findOneAndUpdate({ _id }, data);
    return true;
  }

  async getProducts(category, brand, sortPrice, page, take, status, search) {
    const lastIds = await IdProductLastest.find();
    const condition = {};
    if (category) {
      condition["categoryId"] = category;
    }
    if (brand) {
      condition["brandId"] = brand;
    }
    if (status) {
      condition["isActive"] = status;
    }
    if (search) {
      condition["name"] = new RegExp(search, "i");
    }

    const sort = sortPrice ? { price: sortPrice === "asc" ? 1 : -1 } : {};
    return await pagination(Product, { ...condition }, page, take, {}, sort);
  }

  async getProductsAdmin() {
    const lastIds = await IdProductLastest.find();
    return await Product.find().sort({ updatedAt: -1 });
  }

  async getProductsNew() {
    return await Product.find().sort({ createdAt: -1 }).limit(8);
  }

  async deleteProduct(_id) {
    const product = await this.getProduct(_id);
    if (!product) return false;
    await Promise.all([
      Product.findByIdAndDelete({ _id }), 
      Rating.deleteMany({productId: _id}),
    ]);
    const bills = await Billproduct.find({productId: _id});
    bills.map(async (item) => {
      await Bill.findByIdAndDelete(item.billId);
    })
    return true;
  }
}
