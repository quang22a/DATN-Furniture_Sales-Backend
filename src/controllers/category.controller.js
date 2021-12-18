import mongo from "mongoose";
import { HttpError } from "../utils";
import { CategoryService } from "../services";
import { Admin, Category } from "../models";

const categoryService = new CategoryService();

const createCategory = async (req, res, next) => {
  const data = req.body;
  try {
    await categoryService.create(data);
    res.status(200).json({
      status: 200,
      msg: "Thành công",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const data = await categoryService.getCategories();
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

const getCategoriesAdmin = async (req, res, next) => {
  const { page, take, search } = req.query;
  try {
    const data = await categoryService.getCategoriesAdmin(page, take, search);
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

const getCategoriesTrending = async (req, res, next) => {
  try {
    const data = await categoryService.getCategoriesTrending();
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

const getCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    const data = await categoryService.getCategory(categoryId);
    if (!data) throw new HttpError("Không tìm thấy danh mục này", 400);
    res.status(200).json({
      status: 200,
      msg: "Thành công",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    if (!mongo.Types.ObjectId.isValid(categoryId))
      throw new HttpError("Id incorrect", 401);
    if (!(await categoryService.deleteCategory(categoryId)))
      throw new HttpError("Không tìm thấy danh mục này", 400);
    res.status(200).json({
      status: 200,
      msg: "Thành công",
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  const data = req.body;
  try {
    if (!mongo.Types.ObjectId.isValid(categoryId))
      throw new HttpError("Không tìm thấy danh mục này", 400);

    const category = await Category.findOne({ _id: categoryId }, { __v: 1 });
    if (!category) throw new HttpError("Không tìm thấy danh mục này", 401);

    if (!(await categoryService.update(categoryId, data)))
      throw new HttpError("Không tìm thấy danh mục này", 404);
    res.status(200).json({
      status: 200,
      msg: "Thành công",
    });
  } catch (error) {
    next(error);
  }
};

export const categoryController = {
  createCategory,
  getCategory,
  getCategories,
  getCategoriesAdmin,
  updateCategory,
  deleteCategory,
  getCategoriesTrending,
};
