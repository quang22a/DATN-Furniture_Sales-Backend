import mongo from "mongoose";
import { HttpError } from "../utils";
import { ProductService, RatingService, CustomerService } from "../services";
import { Rating } from "../models";

const productService = new ProductService();
const customerService = new CustomerService();
const ratingService = new RatingService();

const createRating = async (req, res, next) => {
  const data = req.body;
  try {
    const product = await productService.getProduct(data.productId);
    if (!product) throw new HttpError("Không tìm thấy sản phẩm", 400);
    const customer = await customerService.getCustomerById(data.customerId);
    if (!customer) throw new HttpError("Không thể xác định người dùng", 400);
    await ratingService.create(data);
    const ratingOfProduct = await Rating.find({ productId: data.productId });
    product.rating =
      (ratingOfProduct.reduce(
        (accumulator, item) => accumulator + item.rating,
        0
      ) / ratingOfProduct.length).toFixed(1);
    await productService.update(product._id, product);
    res.status(200).json({
      status: 200,
      msg: "Thành công",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getRatings = async (req, res, next) => {
  const { page, take } = req.query;
  try {
    const data = await ratingService.getRatings(page, take);
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

const getRatingsOfProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const data = await ratingService.getRatingsOfProduct(productId);
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

const deleteRating = async (req, res, next) => {
  const { ratingId } = req.params;
  try {
    if (!mongo.Types.ObjectId.isValid(ratingId))
      throw new HttpError("Id không chính xác", 401);
    if (!(await ratingService.deleteRating(ratingId)))
      throw new HttpError("Không tìm thấy đánh giá này", 400);
    const ratingOfProduct = await Rating.find({ productId: data.productId });
    product.rating =
      ratingOfProduct.reduce(
        (accumulator, item) => accumulator + item.rating,
        0
      ) / ratingOfProduct.length;
    await productService.update(product._id, product);
    res.status(200).json({
      status: 200,
      msg: "Thành công",
    });
  } catch (error) {
    next(error);
  }
};

const updateRating = async (req, res, next) => {
  const { ratingId } = req.params;
  const data = req.body;
  try {
    if (!mongo.Types.ObjectId.isValid(ratingId))
      throw new HttpError("Không tìm thấy đánh giá này", 400);

    const rating = await Rating.findOne({ _id: ratingId }, { __v: 1 });
    if (!rating) throw new HttpError("Không tìm thấy đánh giá này", 401);

    if (!(await ratingService.update(ratingId, data)))
      throw new HttpError("Không tìm thấy đánh giá này", 404);
    res.status(200).json({
      status: 200,
      msg: "Thành công",
    });
  } catch (error) {
    next(error);
  }
};

export const ratingController = {
  createRating,
  getRatings,
  updateRating,
  deleteRating,
  getRatingsOfProduct,
};
