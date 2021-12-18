import { categoryController } from "../controllers";
import { validateRequestBody, authMiddleware } from "../middlewares";

import { Router } from "express";

const { jwtMidleware } = authMiddleware;

export const categoryRouter = Router();

categoryRouter
  .route("/api/v1/categories")
  .get(categoryController.getCategories);

categoryRouter
  .route("/api/v1/categories-admin")
  .get(categoryController.getCategoriesAdmin);

categoryRouter
  .route("/api/v1/categories-trending")
  .get(categoryController.getCategoriesTrending);

categoryRouter
  .route("/api/v1/categories/:categoryId")
  .get(categoryController.getCategory);

categoryRouter
  .route("/api/v1/category")
  .post(
    jwtMidleware,
    validateRequestBody.createCategorySchema,
    categoryController.createCategory
  );

categoryRouter
  .route("/api/v1/categories/:categoryId")
  .put(
    jwtMidleware,
    validateRequestBody.updateCategorySchema,
    categoryController.updateCategory
  );

categoryRouter
  .route("/api/v1/categories/:categoryId")
  .delete(jwtMidleware, categoryController.deleteCategory);
