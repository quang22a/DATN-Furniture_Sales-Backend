import { Schema, model } from "mongoose";

const BrandSchema = new Schema(
  {
    title: {
      type: String,
    },
    name: {
      type: String,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Brand = model("brand", BrandSchema, "brand");
