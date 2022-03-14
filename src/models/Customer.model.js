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
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    receiveMail: {
      type: Boolean,
      default: false,
    },
    idRating: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

export const Customer = model("customer", CustomerSchema, "customer");
