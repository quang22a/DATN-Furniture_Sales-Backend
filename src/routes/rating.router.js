import { ratingController } from "../controllers";
import { validateRequestBody, authMiddleware } from "../middlewares";

import { Router } from "express";

const { jwtMidleware } = authMiddleware;

export const ratingRouter = Router();

ratingRouter.route("/api/v1/ratings").get(ratingController.getRatings);
ratingRouter
  .route("/api/v1/ratings/:productId")
  .get(ratingController.getRatingsOfProduct);

ratingRouter
  .route("/api/v1/rating")
  .post(
    jwtMidleware,
    validateRequestBody.createRatingSchema,
    ratingController.createRating
  );

ratingRouter
  .route("/api/v1/ratings/:ratingId")
  .put(
    jwtMidleware,
    validateRequestBody.updateRatingSchema,
    ratingController.updateRating
  );

ratingRouter
  .route("/api/v1/ratings/:ratingId")
  .delete(jwtMidleware, ratingController.deleteRating);
