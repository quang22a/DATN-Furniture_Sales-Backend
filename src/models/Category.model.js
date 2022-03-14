import mongoose, { Schema, model } from "mongoose";
import slug from "mongoose-slug-generator";

mongoose.plugin(slug);

const CategorySchema = new Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      slug: "name",
    },
  },
  { timestamps: true }
);

export const Category = model("category", CategorySchema, "category");
