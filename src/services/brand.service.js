import { Brand, Product } from "../models";
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
    await Promise.all([
      Brand.findByIdAndDelete({ _id }),
      Product.deleteMany({ brandId: _id }),
    ]);
    return true;
  }
}
