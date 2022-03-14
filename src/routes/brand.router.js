import { brandController } from "../controllers";
import { validateRequestBody, authMiddleware } from "../middlewares";

import { Router } from "express";

const { jwtMidleware } = authMiddleware;

export const brandRouter = Router();

brandRouter.route("/api/v1/brands").get(brandController.getBrands);

brandRouter.route("/api/v1/brands-admin").get(brandController.getBrandsAdmin);

brandRouter
  .route("/api/v1/brands-featured")
  .get(brandController.getBrandsFeatured);

brandRouter.route("/api/v1/brands/:brandId").get(brandController.getBrand);

brandRouter
  .route("/api/v1/brand")
  .post(
    jwtMidleware,
    validateRequestBody.createBrandSchema,
    brandController.createBrand
  );

brandRouter
  .route("/api/v1/brands/:brandId")
  .put(
    jwtMidleware,
    validateRequestBody.updateBrandSchema,
    brandController.updateBrand
  );

brandRouter
  .route("/api/v1/brands/:brandId")
  .delete(jwtMidleware, brandController.deleteBrand);
