import { Schema, model } from "mongoose";

const BillproductSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    billId: {
      type: Schema.Types.ObjectId,
      ref: "bill",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Billproduct = model(
  "billproduct",
  BillproductSchema,
  "billproduct"
);
