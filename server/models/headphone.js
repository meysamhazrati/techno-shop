import { Schema } from "mongoose";

import productModel from "./product.js";
import validator from "../validators/headphone.js";

const schema = new Schema(
  {
    weight: {
      type: Number,
      required: true,
      min: 50,
      max: 5000,
    },
    type: {
      type: Number,
      required: true,
      enum: [1, 2],
    },
    connectionType: {
      type: String,
      required: true,
      enum: ["باسیم", "بی‌سیم", "باسیم و بی‌سیم"],
    },
    interface: [
      {
        type: String,
        enum: ["3.5mm Jack", "USB", "Micro-USB", "USB Type-C", "USB Dongle", "Lightning", "Bluetooth"],
      },
    ],
    impedance: {
      type: Number,
      required: true,
      min: 8,
      max: 600,
    },
    battery: {
      type: String,
      required: false,
      minLength: 5,
      maxLength: 50,
    },
    batteryCapacity: {
      type: Number,
      required: false,
      min: 1,
      max: 50,
    },
    hasNoiseCancelling: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

schema.statics.validation = (body) => validator.validate(body);

export default productModel.discriminator("Headphone", schema);