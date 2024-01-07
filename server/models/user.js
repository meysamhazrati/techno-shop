import { Schema, Types, model } from "mongoose";

const schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 70,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 70,
    },
    phone: {
      type: String,
      required: true,
      minLength: 11,
      maxLength: 11,
      match: /^09\d{9}$/,
    },
    email: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 100,
      match: /^\w+([.-]?\w)*@\w+([.-]?\w)*\.[a-zA-Z]{2,4}$/,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["USER", "ADMIN"],
    },
    avatar: {
      type: String,
      required: false,
      default: "user.jpg",
    },
    cart: [
      {
        type: Types.ObjectId,
        ref: "products",
      },
    ],
    favorites: [
      {
        type: Types.ObjectId,
        ref: "products",
      },
    ],
  },
  { timestamps: true }
);

schema.virtual("addresses", {
  ref: "Address",
  localField: "_id",
  foreignField: "recipient",
});

schema.virtual("orders", {
  ref: "Order",
  localField: "_id",
  foreignField: "customer",
});

schema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "sender",
});

schema.virtual("articles", {
  ref: "Article",
  localField: "_id",
  foreignField: "author",
});

schema.virtual("tickets", {
  ref: "Ticket",
  localField: "_id",
  foreignField: "sender",
});

schema.virtual("notifications", {
  ref: "Notification",
  localField: "_id",
  foreignField: "user",
});

export default model("User", schema);