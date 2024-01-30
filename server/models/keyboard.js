import { Schema } from "mongoose";

import productModel from "./product.js";
import validator from "../validators/keyboard.js";

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
      enum: ["Wired", "Wireless", "Wired and Wireless"],
    },
    interfaces: [
      {
        type: String,
        enum: ["USB", "USB Type-C", "USB Dongle", "Bluetooth"],
      },
    ],
  },
  { timestamps: true }
);

schema.statics.validation = (body) => validator.validate(body);

export default productModel.discriminator("Keyboard", schema);