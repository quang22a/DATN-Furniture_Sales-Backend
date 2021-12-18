import mongoose, { Schema, model } from "mongoose";
import slug from "mongoose-slug-generator";

mongoose.plugin(slug);

const BrandSchema = new Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    isFeatured: {
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

export const Brand = model("brand", BrandSchema, "brand");
