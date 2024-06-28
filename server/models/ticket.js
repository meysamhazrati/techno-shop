import { Schema, Types, model } from "mongoose";

const schema = new Schema({
  department: {
    type: String,
    required: false,
    enum: ["مدیریت", "مالی", "پیگیری سفارش", "پشتیبانی", "بازخورد", "سایر"],
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
}, { timestamps: true });

schema.virtual("replies", {
  ref: "Ticket",
  localField: "_id",
  foreignField: "ticket",
});

export default model("Ticket", schema);