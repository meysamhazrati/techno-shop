import { Schema } from "mongoose";

import productModel from "./product.js";
import validator from "../validators/case.js";

const schema = new Schema(
  {
    length: {
      type: Number,
      required: true,
      min: 300,
      max: 700,
    },
    width: {
      type: Number,
      required: true,
      min: 100,
      max: 500,
    },
    height: {
      type: Number,
      required: true,
      min: 300,
      max: 800,
    },
    weight: {
      type: Number,
      required: true,
      min: 4000,
      max: 30000,
    },
    motherboard: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 20,
    },
    CPU: {
      type: String,
      required: true,
      enum: ["Intel", "AMD"],
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
      minLength: 5,
      maxLength: 50,
    },
    CPUFrequency: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    CPUCore: {
      type: Number,
      required: true,
      min: 2,
      max: 20,
    },
    GPU: {
      type: String,
      required: true,
      enum: ["Intel", "AMD", "NVIDIA"],
    },
    GPUModel: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 50,
    },
    VRAM: {
      type: Number,
      required: true,
      min: 2,
      max: 30,
    },
    operatingSystem: {
      type: String,
      required: true,
      enum: ["Windows", "No operating system"],
    },
    operatingSystemVersion: {
      type: Number,
      required: false,
      enum: [10, 11],
    },
    internalMemory: {
      type: Number,
      required: true,
      enum: [128, 256, 512, 1024, 2048],
    },
    internalMemoryType: {
      type: String,
      required: true,
      enum: ["HDD", "SSD"],
    },
    RAM: {
      type: Number,
      required: true,
      min: 2,
      max: 128,
    },
    RAMType: {
      type: String,
      required: true,
      enum: ["DDR3", "DDR4", "DDR5"],
    },
  },
  { timestamps: true }
);

schema.statics.validation = (body) => validator.validate(body);

export default productModel.discriminator("Case", schema);