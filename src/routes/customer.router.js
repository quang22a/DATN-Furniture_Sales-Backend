import { Router } from "express";
import { customerController } from "../controllers";
import { validateRequestBody, authMiddleware } from "../middlewares";
const { jwtMidleware } = authMiddleware;

export const customerRouter = Router();

customerRouter
  .route("/api/v1/customers")
  .get(jwtMidleware, customerController.getCustomers);

customerRouter
  .route("/api/v1/customers-count")
  .get(jwtMidleware, customerController.countCustomer);

customerRouter
  .route("/api/v1/customers/:id")
  .delete(jwtMidleware, customerController.deleteCustomer);

customerRouter
  .route("/api/v1/customers/:id")
  .put(
    jwtMidleware,
    validateRequestBody.updateInfoSchema,
    customerController.updateCustomer
  );

customerRouter
  .route("/api/v1/customers/:id")
  .get(jwtMidleware, customerController.getCustomer);
