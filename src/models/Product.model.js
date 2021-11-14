import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    brandId: {
      type: Schema.Types.ObjectId,
      ref: "brand",
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    name: {
      type: String,
      require: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numberOfReview: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    material: {
      type: String,
      require: true,
    },
    color: {
      type: [String],
      require: true,
    },
    size: {
      type: [String],
      require: true,
    },
  },
  { timestamps: true }
);

export const Product = model("product", ProductSchema, "product");
