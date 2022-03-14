import { Schema, model } from "mongoose";

export const notificationSchema = new Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Notification = model(
  "notification",
  notificationSchema,
  "notification"
);
