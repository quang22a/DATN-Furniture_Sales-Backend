import mongo from "mongoose";
import { HttpError } from "../utils";
import { ProductService, BrandService, CategoryService } from "../services";
import { Product } from "../models";

const productService = new ProductService();
const brandService = new BrandService();
const categoryService = new CategoryService();

const createProduct = async (req, res, next) => {
  const data = req.body;
  try {
    const brand = await brandService.getBrand(data.brandId);
    if (!brand) throw new HttpError("Thương hiệu sản phẩm không có", 400);
    const category = await categoryService.getCategory(data.categoryId);
    if (!category) throw new HttpError("Danh mục sản phẩm không có", 400);
    await productService.create(data);
    res.status(200).json({
      status: 200,
      msg: "Thành công",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getProducts = async (req, res, next) => {
  const { page, take } = req.query;
  try {
    const data = await productService.getProducts(page, take);
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

const getProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const data = await productService.getProduct(productId);
    if (!data) throw new HttpError("Không tìm thấy sản phẩm", 400);
    res.status(200).json({
      status: 200,
      msg: "Thành công",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    if (!mongo.Types.ObjectId.isValid(productId))
      throw new HttpError("Id incorrect", 401);
    if (!(await productService.deleteProduct(productId)))
      throw new HttpError("Không tìm thấy sản phẩm", 400);
    res.status(200).json({
      status: 200,
      msg: "Thành công",
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  const { productId } = req.params;
  const data = req.body;
  try {
    if (!mongo.Types.ObjectId.isValid(productId))
      throw new HttpError("Không tìm thấy sản phẩm", 400);

    const product = await Product.findOne({ _id: productId }, { __v: 1 });
    if (!product) throw new HttpError("Không tìm thấy sản phẩm", 401);

    if (!(await productService.update(productId, data)))
      throw new HttpError("Không tìm thấy sản phẩm", 404);
    res.status(200).json({
      status: 200,
      msg: "Thành công",
    });
  } catch (error) {
    next(error);
  }
};

export const productController = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
