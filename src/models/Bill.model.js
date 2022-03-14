import { Schema, model } from "mongoose";

const BillSchema = new Schema(
  {
    customer: {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "customer",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: Boolean,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    totalProduct: {
      type: Number,
      required: true,
    },
    additional: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const Bill = model("bill", BillSchema, "bill");
