import { Schema, Types, model } from "mongoose";

import { create, check } from "../validators/discountCode.js";

const schema = new Schema(
  {
    code: {
      type: String,
      required: false,
      minLength: 7,
      maxLength: 7,
      match: /^[a-zA-Z\d]{7}$/,
      default: () => Array(7).fill(0).map(() => "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 62)]).join(""),
    },
    percent: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
    },
    minimumAmount: {
      type: Number,
      required: true,
      min: 0,
      max: 10000000,
    },
    maximumUsage: {
      type: Number,
      required: true,
      min: 1,
      max: 1000000000,
    },
    usages: {
      type: Number,
      required: false,
      default: 0,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    creator: {
      type: Types.ObjectId,
      ref: "User",
    },
    categories: [
      {
        type: Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  { timestamps: true }
);

schema.statics.createValidation = (body) => create.validate(body);
schema.statics.checkValidation = (body) => check.validate(body);

export default model("DiscountCode", schema);