import { Schema, model } from "mongoose";

const StaffSchema = new Schema(
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
  },
  { timestamps: true }
);

export const Staff = model("staff", StaffSchema, "staff");
