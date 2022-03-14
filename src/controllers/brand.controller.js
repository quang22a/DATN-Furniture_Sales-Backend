import mongo from "mongoose";
import { HttpError } from "../utils";
import { BrandService } from "../services";
import { Brand, Admin } from "../models";

const brandService = new BrandService();

const createBrand = async (req, res, next) => {
  const data = req.body;
  try {
    await brandService.create(data);
    res.status(200).json({
      status: 200,
      msg: "Thành công",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getBrands = async (req, res, next) => {
  try {
    const data = await brandService.getBrands();
    if (!data) throw new HttpError("Lỗi", 400);
    res.status(200).json({
      status: 200,
      msg: "Thành công",
      data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getBrandsAdmin = async (req, res, next) => {
  const { page, take, search } = req.query;
  try {
    const data = await brandService.getBrandsAdmin(page, take, search);
    if (!data) throw new HttpError("Lỗi", 400);
    res.status(200).json({
      status: 200,
      msg: "Thành công",
      data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getBrandsFeatured = async (req, res, next) => {
  try {
    const data = await brandService.getBrandsFeatured();
    if (!data) throw new HttpError("Lỗi", 400);
    res.status(200).json({
      status: 200,
      msg: "Thành công",
      data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getBrand = async (req, res, next) => {
  const { brandId } = req.params;
  try {
    const data = await brandService.getBrand(brandId);
    if (!data) throw new HttpError("Không tìm thấy thương hiệu này", 400);
    res.status(200).json({
      status: 200,
      msg: "Thành công",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBrand = async (req, res, next) => {
  const { brandId } = req.params;
  try {
    if (!mongo.Types.ObjectId.isValid(brandId))
      throw new HttpError("Id incorrect", 401);
    if (!(await brandService.deleteBrand(brandId)))
      throw new HttpError("Không tìm thấy thương hiệu này", 400);
    res.status(200).json({
      status: 200,
      msg: "Thành công",
    });
  } catch (error) {
    next(error);
  }
};

const updateBrand = async (req, res, next) => {
  const { brandId } = req.params;
  const data = req.body;
  try {
    if (!mongo.Types.ObjectId.isValid(brandId))
      throw new HttpError("Không tìm thấy thương hiệu này", 400);

    const brand = await Brand.findOne({ _id: brandId }, { __v: 1 });
    if (!brand) throw new HttpError("Không tìm thấy thương hiệu này", 401);

    if (!(await brandService.update(brandId, data)))
      throw new HttpError("Không tìm thấy thương hiệu này", 404);
    res.status(200).json({
      status: 200,
      msg: "Thành công",
    });
  } catch (error) {
    next(error);
  }
};

export const brandController = {
  createBrand,
  getBrand,
  getBrands,
  getBrandsAdmin,
  getBrandsFeatured,
  updateBrand,
  deleteBrand,
};
