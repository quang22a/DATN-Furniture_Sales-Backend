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
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    idRating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
ProductSchema.index({
  name: "text",
});
export const Product = model("product", ProductSchema, "product");
