import { productController } from "../controllers";
import { validateRequestBody, authMiddleware } from "../middlewares";

import { Router } from "express";

const { jwtMidleware } = authMiddleware;

export const productRouter = Router();

productRouter.route("/api/v1/products").get(productController.getProducts);

productRouter.route("/api/v1/products-rs").get(jwtMidleware, productController.getProductsRS);

productRouter
  .route("/api/v1/products-count")
  .get(productController.countProduct);

productRouter
  .route("/api/v1/products-count-sale")
  .get(productController.countProductSale);

productRouter
  .route("/api/v1/products-hot")
  .get(productController.getProductHot);

productRouter
  .route("/api/v1/products-admin")
  .get(productController.getProductsAdmin);

productRouter
  .route("/api/v1/products-new")
  .get(productController.getProductsNew);

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
    validateRequestBody.updateProductSchema,
    productController.updateProduct
  );

productRouter
  .route("/api/v1/products/:productId")
  .delete(jwtMidleware, productController.deleteProduct);
