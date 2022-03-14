import { adminController } from "../controllers";
import { validateRequestBody, authMiddleware } from "../middlewares";
import constant from "../constant";
const { ACTION_CODE } = constant;

import { Router } from "express";
const { jwtMidleware } = authMiddleware;

export const adminRouter = Router();

adminRouter
  .route("/api/v1/admin/login")
  .post(validateRequestBody.loginAdminSchema, adminController.login);

adminRouter
  .route("/api/v1/admin")
  .post(
    jwtMidleware,
    validateRequestBody.createModSchema,
    adminController.createMod
  ); //  CREATE_MOD

adminRouter
  .route("/api/v1/admin/:id")
  .delete(jwtMidleware, adminController.deleteMod); //  DELETE_USER

adminRouter.route("/api/v1/admin").get(jwtMidleware, adminController.getMods); //  GET_USERS
