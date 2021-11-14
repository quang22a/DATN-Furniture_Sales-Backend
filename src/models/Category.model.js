import { Schema, model } from "mongoose";

const CategorySchema = new Schema(
  {
    title: {
      type: String,
    },
    name: {
      type: String,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Category = model("category", CategorySchema, "category");
