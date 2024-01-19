import { Schema } from "mongoose";

import productModel from "./product.js";

const schema = new Schema(
  {
    length: {
      type: Number,
      required: true,
      min: 50,
      max: 200,
    },
    width: {
      type: Number,
      required: true,
      min: 20,
      max: 100,
    },
    height: {
      type: Number,
      required: true,
      min: 20,
      max: 100,
    },
    weight: {
      type: Number,
      required: true,
      min: 50,
      max: 500,
    },
    buttons: {
      type: Number,
      required: true,
      min: 2,
      max: 20,
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
    minimumDPI: {
      type: Number,
      required: true,
      min: 800,
      max: 30000,
    },
    maximumDPI: {
      type: Number,
      required: true,
      min: 800,
      max: 30000,
    },
  },
  { timestamps: true }
);

export default productModel.discriminator("Mouse", schema);