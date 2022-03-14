import { contactController } from "../controllers";
import { validateRequestBody, authMiddleware } from "../middlewares";

import { Router } from "express";

const { jwtMidleware } = authMiddleware;

export const contactRouter = Router();

contactRouter
  .route("/api/v1/contacts")
  .get(jwtMidleware, contactController.getContacts);

contactRouter
  .route("/api/v1/contacts/:contactId")
  .get(jwtMidleware, contactController.getContact);

contactRouter
  .route("/api/v1/contact")
  .post(
    validateRequestBody.createContactSchema,
    contactController.createContact
  );

contactRouter
  .route("/api/v1/contacts/:contactId")
  .delete(jwtMidleware, contactController.deleteContact);

contactRouter
  .route("/api/v1/contacts/:contactId")
  .put(
    jwtMidleware,
    validateRequestBody.updateContactSchema,
    contactController.updateContact
  );
