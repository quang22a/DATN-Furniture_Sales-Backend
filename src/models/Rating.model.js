import { Schema, model } from "mongoose";

const RatingSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "customer",
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    rating: {
      type: Number,
      require: true,
    },
    comment: {
      type: String,
      default: "",
    },
    customerIdRating: {
      type: Number,
      require: true,
    },
    productIdRating: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

export const Rating = model("rating", RatingSchema, "rating");
