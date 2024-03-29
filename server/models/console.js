import { Schema } from "mongoose";

import productModel from "./product.js";
import validator from "../validators/console.js";

const schema = new Schema(
  {
    length: {
      type: Number,
      required: true,
      min: 100,
      max: 300,
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
      min: 200,
      max: 500,
    },
    weight: {
      type: Number,
      required: true,
      min: 2000,
      max: 7000,
    },
    drive: {
      type: String,
      required: true,
      enum: ["CD", "DVD", "Blue-ray", "No drive"],
    },
    CPU: {
      type: String,
      required: true,
      enum: ["AMD"],
    },
    CPUSeries: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 50,
    },
    CPUGeneration: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 50,
    },
    CPUCore: {
      type: Number,
      required: true,
      min: 8,
      max: 8,
    },
    GPU: {
      type: String,
      required: true,
      enum: ["AMD"],
    },
    GPUModel: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 50,
    },
    storage: {
      type: Number,
      required: true,
      enum: [512, 825, 1000],
    },
    RAM: {
      type: Number,
      min: 8,
      max: 16,
    },
  },
  { timestamps: true }
);

schema.statics.validation = (body) => validator.validate(body);

export default productModel.discriminator("Console", schema);