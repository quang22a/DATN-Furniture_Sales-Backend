import { Router } from "express";
import { staffController } from "../controllers";
import { validateRequestBody, authMiddleware } from "../middlewares";
const { jwtMidleware } = authMiddleware;

export const staffRouter = Router();

staffRouter
  .route("/api/v1/staffs")
  .get(jwtMidleware, staffController.getStaffs);

staffRouter
  .route("/api/v1/staffs-count")
  .get(jwtMidleware, staffController.countStaff);

staffRouter
  .route("/api/v1/staffs/:id")
  .delete(jwtMidleware, staffController.deleteStaff);

staffRouter
  .route("/api/v1/staffs/:id")
  .put(
    jwtMidleware,
    validateRequestBody.updateInfoSchema,
    staffController.updateStaff
  );

staffRouter
  .route("/api/v1/staffs/:id")
  .get(jwtMidleware, staffController.getStaff);
