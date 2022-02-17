import { notificationController } from "../controllers";
import { validateRequestBody, authMiddleware } from "../middlewares";

import { Router } from "express";

const { jwtMidleware } = authMiddleware;

export const notificationRouter = Router();

notificationRouter
  .route("/api/v1/notifications")
  .get(notificationController.notifications);

notificationRouter
  .route("/api/v1/notifications-admin")
  .get(notificationController.getListNotifications);

notificationRouter
  .route("/api/v1/notifications/:id")
  .get(notificationController.getNotification);

notificationRouter
  .route("/api/v1/notification")
  .post(
    jwtMidleware,
    validateRequestBody.createNotificationSchema,
    notificationController.createNotification
  );

notificationRouter
  .route("/api/v1/notifications/:id")
  .put(
    jwtMidleware,
    validateRequestBody.updateNotificationSchema,
    notificationController.update
  );

notificationRouter
  .route("/api/v1/notifications/:id")
  .delete(
    jwtMidleware,
    notificationController.deleteNoti
  );
