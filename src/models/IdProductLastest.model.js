import { Schema, model } from "mongoose";

const IdProductLastestSchema = new Schema(
  {
    idRating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
IdProductLastestSchema.index({
  idRating: "text",
});
export const IdProductLastest = model("idProductLastest", IdProductLastestSchema, "idProductLastest");
