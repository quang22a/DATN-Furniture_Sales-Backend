import { productController } from "../controllers";
import { validateRequestBody, authMiddleware } from "../middlewares";

import { Router } from "express";

const { jwtMidleware } = authMiddleware;

export const productRouter = Router();

productRouter.route("/api/v1/products").get(productController.getProducts);
productRouter
  .route("/api/v1/products/:productId")
  .get(productController.getProduct);

productRouter
  .route("/api/v1/product")
  .post(
    jwtMidleware,
    validateRequestBody.createProductSchema,
    productController.createProduct
  );

productRouter
  .route("/api/v1/products/:productId")
  .put(
    jwtMidleware,
    validateRequestBody.createProductSchema,
    productController.updateProduct
  );

productRouter
  .route("/api/v1/products/:productId")
  .delete(jwtMidleware, productController.deleteProduct);
