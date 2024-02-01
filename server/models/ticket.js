import { Schema, Types, model } from "mongoose";

import validator from "../validators/ticket.js";

const schema = new Schema(
  {
    department: {
      type: String,
      required: true,
      enum: ["Management", "Finance", "Order Tracking", "Support", "Feedback", "Other"],
    },
    title: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 20,
    },
    body: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 300,
    },
    isOpen: {
      type: Boolean,
      required: false,
      default: true,
    },
    sender: {
      type: Types.ObjectId,
      ref: "User",
    },
    ticket: {
      type: Types.ObjectId,
      ref: "Ticket",
    },
  },
  { timestamps: true }
);

schema.virtual("replies", {
  ref: "Ticket",
  localField: "_id",
  foreignField: "ticket",
});

schema.statics.validation = (body) => validator.validate(body);

export default model("Ticket", schema);