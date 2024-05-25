import { Schema, Types, model } from "mongoose";

import { create, reply } from "../validators/ticket.js";

const schema = new Schema(
  {
    department: {
      type: String,
      required: false,
      enum: ["Management", "Finance", "Order Tracking", "Support", "Feedback", "Other"],
    },
    title: {
      type: String,
      required: false,
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

schema.statics.createValidation = (body) => create.validate(body);
schema.statics.replyValidation = (body) => reply.validate(body);

export default model("Ticket", schema);