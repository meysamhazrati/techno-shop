import { Schema } from "mongoose";

import productModel from "./product.js";
import validator from "../validators/monitor.js";

const schema = new Schema(
  {
    weight: {
      type: Number,
      required: true,
      min: 1000,
      max: 50000,
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
      min: 10,
      max: 60,
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
    minimumResponseTime: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    maximumResponseTime: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    panel: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 20,
    },
    backlight: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    color: {
      type: Number,
      required: true,
      min: 1000000,
      max: 1000000000,
    },
  },
  { timestamps: true }
);

schema.statics.validation = (body) => validator.validate(body);

export default productModel.discriminator("Monitor", schema);