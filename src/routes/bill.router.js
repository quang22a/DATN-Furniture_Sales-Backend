import { billController } from "../controllers";
import { validateRequestBody, authMiddleware } from "../middlewares";

import { Router } from "express";

const { jwtMidleware } = authMiddleware;

export const billRouter = Router();

billRouter
  .route("/api/v1/bill")
  .post(
    jwtMidleware,
    validateRequestBody.createBillSchema,
    billController.createBill
  );

billRouter.route("/api/v1/bills").get(jwtMidleware, billController.getBills);

billRouter.route("/api/v1/bills/:id").get(jwtMidleware, billController.getBill);

billRouter
  .route("/api/v1/bill-product/:id")
  .get(jwtMidleware, billController.getProductOfBill);

billRouter
  .route("/api/v1/bills/:id")
  .put(
    jwtMidleware,
    validateRequestBody.updateBillSchema,
    billController.updateBill
  );

billRouter
  .route("/api/v1/bills/:id")
  .delete(jwtMidleware, billController.deleteBill);

billRouter
  .route("/api/v1/revenues")
  .get(jwtMidleware, billController.getRevenue);
