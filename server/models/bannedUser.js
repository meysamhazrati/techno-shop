import { Schema, model } from "mongoose";

const schema = new Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

export default model("BannedUser", schema);