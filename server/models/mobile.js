import { Schema } from "mongoose";

import productModel from "./product.js";
import validator from "../validators/mobile.js";

const schema = new Schema(
  {
    length: {
      type: Number,
      required: true,
      min: 50,
      max: 500,
    },
    width: {
      type: Number,
      required: true,
      min: 30,
      max: 300,
    },
    thickness: {
      type: Number,
      required: true,
      min: 2,
      max: 20,
    },
    weight: {
      type: Number,
      required: true,
      min: 50,
      max: 500,
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
      enum: ["Android", "iOS"],
    },
    operatingSystemVersion: {
      type: Number,
      required: true,
      min: 12,
      max: 20,
    },
    internalMemory: {
      type: Number,
      required: true,
      enum: [16, 32, 64, 128, 256, 512, 1024],
    },
    RAM: {
      type: Number,
      required: true,
      min: 2,
      max: 50,
    },
    memoryCard: {
      type: String,
      required: true,
      enum: ["Separate", "Shared", "No memory card"],
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
      max: 10,
    },
    resolutionWidth: {
      type: Number,
      required: true,
      min: 500,
      max: 10000,
    },
    resolutionHeight: {
      type: Number,
      required: true,
      min: 500,
      max: 10000,
    },
    SIMCard: {
      type: Number,
      required: true,
      enum: [1, 2],
    },
    network: {
      type: String,
      required: true,
      enum: ["2G", "3G", "4G", "5G"],
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
      min: 3000,
      max: 10000,
    },
    chargingPort: {
      type: String,
      required: true,
      enum: ["Micro-USB", "USB Type-C", "Lightning"],
    },
    chargingSpeed: {
      type: Number,
      required: true,
      min: 15,
      max: 150,
    },
    camera: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    photoResolution: {
      type: Number,
      required: true,
      min: 12,
      max: 200,
    },
    videoResolutionWidth: {
      type: Number,
      required: true,
      min: 500,
      max: 10000,
    },
    videoResolutionHeight: {
      type: Number,
      required: true,
      min: 500,
      max: 10000,
    },
    videoFPS: {
      type: Number,
      required: true,
      min: 30,
      max: 120,
    },
    headphoneJack: {
      type: String,
      required: true,
      enum: ["3.5mm Jack", "USB Type-C", "Lightning"],
    },
    hasFingerprintSensor: {
      type: Boolean,
      required: true,
    },
    isWaterproof: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

schema.statics.validation = (body) => validator.validate(body);

export default productModel.discriminator("Mobile", schema);