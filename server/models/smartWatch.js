import { Schema } from "mongoose";

import productModel from "./product.js";
import validator from "../validators/smartWatch.js";

const schema = new Schema(
  {
    weight: {
      type: Number,
      required: true,
      min: 30,
      max: 500,
    },
    strapMaterial: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    chip: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 100,
    },
    operatingSystem: {
      type: String,
      required: true,
      enum: ["WearOS", "WatchOS", "Tizen"],
    },
    operatingSystemVersion: {
      type: Number,
      required: true,
      min: 3,
      max: 10,
    },
    internalMemory: {
      type: Number,
      required: true,
      enum: [16, 32, 64, 128, 256],
    },
    RAM: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    screen: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    screenSize: {
      type: Number,
      required: true,
      min: 1,
      max: 4,
    },
    resolutionWidth: {
      type: Number,
      required: true,
      min: 200,
      max: 1000,
    },
    resolutionHeight: {
      type: Number,
      required: true,
      min: 200,
      max: 1000,
    },
    battery: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 50,
    },
    batteryCapacity: {
      type: Number,
      required: true,
      min: 200,
      max: 1000,
    },
    isWaterproof: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

schema.statics.validation = (body) => validator.validate(body);

export default productModel.discriminator("SmartWatch", schema);