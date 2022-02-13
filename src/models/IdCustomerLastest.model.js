import { Schema, model } from "mongoose";

const IdCustomerLastestSchema = new Schema(
  {
    idRating: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

export const IdCustomerLastest = model("idCustomerLastest", IdCustomerLastestSchema, "idCustomerLastest");
