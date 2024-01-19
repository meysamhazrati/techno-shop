import { Schema } from "mongoose";

import productModel from "./product.js";

const schema = new Schema(
  {
    length: {
      type: Number,
      required: true,
      min: 100,
      max: 500,
    },
    width: {
      type: Number,
      required: true,
      min: 50,
      max: 200,
    },
    height: {
      type: Number,
      required: true,
      min: 10,
      max: 50,
    },
    weight: {
      type: Number,
      required: true,
      min: 500,
      max: 5000,
    },
    keys: {
      type: Number,
      required: true,
      min: 40,
      max: 120,
    },
    connectionType: {
      type: String,
      required: true,
      enum: ["باسیم", "بی‌سیم", "باسیم و بی‌سیم"],
    },
    interface: [
      {
        type: String,
        enum: ["USB", "USB Type-C", "USB Dongle", "Bluetooth"],
      },
    ],
  },
  { timestamps: true }
);

export default productModel.discriminator("Keyboard", schema);