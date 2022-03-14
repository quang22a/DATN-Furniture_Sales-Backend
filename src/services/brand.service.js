import { Brand, Product, Bill, Billproduct, Rating } from "../models";
import { pagination } from "../utils";

export default class BrandService {
  async create(data) {
    return await Brand.create(data);
  }
  async getBrand(_id) {
    return await Brand.findOne(
      { _id },
      {
        __v: 0,
      }
    );
  }

  async update(_id, data) {
    if (!(await this.getBrand(_id))) return false;
    await Brand.findOneAndUpdate({ _id }, data);
    return true;
  }

  async getBrands() {
    return await Brand.find();
  }

  async getBrandsAdmin(page, take, search) {
    const condition = {};
    if (search) condition["name"] = new RegExp(search, "i");
    return await pagination(Brand, condition, page, take);
  }

  async getBrandsFeatured() {
    return await Brand.find({ isFeatured: true });
  }

  async deleteBrand(_id) {
    const brand = await this.getBrand(_id);
    if (!brand) return false;
    await Brand.findByIdAndDelete({ _id });
    const productBrand = await Product.find({ brandId: _id });
    productBrand.map(async (item) => {
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
