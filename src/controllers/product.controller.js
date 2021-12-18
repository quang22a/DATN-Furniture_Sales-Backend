import mongo from "mongoose";
import { HttpError } from "../utils";
import { ProductService, BrandService, CategoryService } from "../services";
import { Category, Product, Bill, Billproduct } from "../models";

const productService = new ProductService();
const brandService = new BrandService();
const categoryService = new CategoryService();

const createProduct = async (req, res, next) => {
  const data = req.body;
  try {
    const brand = await brandService.getBrand(data.brandId);
    if (!brand)
      throw new HttpError("Không tìm thấy thương hiệu sản phẩm này", 400);
    const category = await categoryService.getCategory(data.categoryId);
    if (!category)
      throw new HttpError("Không tìm thấy danh mục sản phẩm này", 400);
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
  const { category, brand, sortPrice, page, take, status, search } = req.query;
  try {
    const data = await productService.getProducts(
      category,
      brand,
      sortPrice,
      page,
      take,
      status,
      search
    );
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

const getProductsAdmin = async (req, res, next) => {
  try {
    const data = await productService.getProductsAdmin();
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

const getProductsNew = async (req, res, next) => {
  try {
    const data = await productService.getProductsNew();
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

const getProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const data = await productService.getProduct(productId);
    if (!data) throw new HttpError("Không tìm thấy sản phẩm", 400);
    const category = await Category.findOne({ _id: data.categoryId });
    res.status(200).json({
      status: 200,
      msg: "Thành công",
      data: data,
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
  console.log(data);
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

const countProduct = async (req, res, next) => {
  try {
    const listProducts = await Product.find();
    if (!listProducts) throw new HttpError("Lỗi", 400);
    let data = 0;
    listProducts.map((item) => {
      data = data + item.quantity;
    });
    res.status(200).json({
      status: 200,
      msg: "Thành công",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

const countProductSale = async (req, res, next) => {
  try {
    const listBills = await Bill.find();
    if (!listBills) throw new HttpError("Lỗi", 400);
    let data = 0;
    listBills.map((item) => {
      data = data + item.totalProduct;
    });
    res.status(200).json({
      status: 200,
      msg: "Thành công",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

const getProductHot = async (req, res, next) => {
  try {
    const listBillProduct = await Billproduct.find();
    if (!listBillProduct) throw new HttpError("Lỗi", 400);
    const productBill = [];
    listBillProduct.map((item) => {
      let i;
      if (
        productBill.find((item1, index1) => {
          i = index1;
          return (
            JSON.stringify(item1.productId) === JSON.stringify(item.productId)
          );
        })
      ) {
        productBill[i].quantity += item.quantity;
      } else {
        productBill.push(item);
      }
    });
    const productHot = await Product.aggregate([
      {
        $match: {
          _id: mongo.Types.ObjectId(
            productBill.sort(
              (item1, item2) => item2.quantity - item1.quantity
            )[0].productId
          ),
        },
      },
      {
        $lookup: {
          from: "category",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $project: {
          __v: 0,
          status: 0,
          createdAt: 0,
        },
      },
    ]).sort({ updatedAt: -1 });
    productHot[0].quantitySale = productBill.sort(
      (item1, item2) => item2.quantity - item1.quantity
    )[0].quantity;
    res.status(200).json({
      status: 200,
      msg: "Thành công",
      data: productHot[0],
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
  getProductsAdmin,
  getProductsNew,
  countProduct,
  countProductSale,
  getProductHot,
};
