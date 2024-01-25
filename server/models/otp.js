import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 100,
      match: /^\w+([.-]?\w)*@\w+([.-]?\w)*\.[a-zA-Z]{2,4}$/,
    },
    code: {
      type: String,
      required: false,
      default: () => Array(7).fill(0).map((number) => Math.floor(Math.random() * 10)).join(""),
    },
    tries: {
      type: Number,
      required: false,
      min: 0,
      max: 3,
      default: 0,
    },
    expiresAt: {
      type: Date,
      required: false,
      default: () => Date.now() + 1000 * 60 * 2,
      expires: "3h",
    },
  },
  { timestamps: true }
);

export default model("OTP", schema);