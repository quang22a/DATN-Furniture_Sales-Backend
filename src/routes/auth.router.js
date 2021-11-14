import { Router } from "express";
import { authController } from "../controllers";
import { validateRequestBody, authMiddleware } from "../middlewares";
const { jwtMidleware } = authMiddleware;

export const authRouter = Router();

authRouter
  .route("/api/v1/auth/register-staff")
  .post(validateRequestBody.registerStaffSchema, authController.registerStaff);

authRouter
  .route("/api/v1/auth/register-customer")
  .post(
    validateRequestBody.registerCustomerSchema,
    authController.registerCustomer
  );

authRouter
  .route("/api/v1/auth/login")
  .post(validateRequestBody.loginSchema, authController.login);

authRouter
  .route("/api/v1/auth/update-password")
  .post(
    jwtMidleware,
    validateRequestBody.updatePassSchema,
    authController.updatePassword
  );

authRouter
  .route("/api/v1/auth/profile")
  .get(jwtMidleware, authController.profile);

authRouter
  .route("/api/v1/auth/profile")
  .patch(
    jwtMidleware,
    validateRequestBody.updateInfoSchema,
    authController.updateProfile
  );
