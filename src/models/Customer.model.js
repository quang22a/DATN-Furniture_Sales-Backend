import { Schema, model } from "mongoose";

const CustomerSchema = new Schema(
  {
    accountId: {
      type: Schema.Types.ObjectId,
      ref: "account",
      required: true,
    },
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
    },
    image: {
      type: String,
    },
    phone: {
      type: String,
    },
    gender: {
      type: String,
    },
    address: {
      type: String,
    },
    birthday: {
      type: String,
    },
    receiveMail: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Customer = model("customer", CustomerSchema, "customer");
