import { Schema } from "mongoose";

import productModel from "./product.js";

const schema = new Schema({
  weight: {
    type: Number,
    required: true,
    min: 50,
    max: 5000,
  },
  connectionType: {
    type: String,
    required: true,
    enum: ["با‌سیم", "بی‌سیم", "با‌سیم و بی‌سیم"],
  },
  interfaces: [
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
}, { timestamps: true });

export default productModel.discriminator("Headphone", schema);