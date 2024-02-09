import { Schema, Types, model } from "mongoose";

import validator from "../validators/comment.js";

const schema = new Schema(
  {
    body: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 300,
    },
    score: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    isBuyer: {
      type: Boolean,
      required: false,
    },
    isConfirmed: {
      type: Boolean,
      required: false,
      default: false,
    },
    sender: {
      type: Types.ObjectId,
      ref: "User",
    },
    product: {
      type: Types.ObjectId,
      ref: "Product",
    },
    article: {
      type: Types.ObjectId,
      ref: "Article",
    },
  },
  { timestamps: true }
);

schema.statics.validation = (body) => validator.validate(body);

export default model("Comment", schema);