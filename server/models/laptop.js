import { Schema } from "mongoose";

import productModel from "./product.js";

const schema = new Schema({
  length: {
    type: Number,
    required: true,
    min: 300,
    max: 500,
  },
  width: {
    type: Number,
    required: true,
    min: 200,
    max: 500,
  },
  thickness: {
    type: Number,
    required: true,
    min: 10,
    max: 30,
  },
  weight: {
    type: Number,
    required: true,
    min: 1000,
    max: 3000,
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
    enum: ["Intel", "AMD", "Apple"],
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
    enum: ["Intel", "AMD", "NVIDIA", "Apple"],
  },
  GPUModel: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  GPURAM: {
    type: Number,
    required: true,
    min: 2,
    max: 30,
  },
  operatingSystem: {
    type: String,
    required: true,
    enum: ["Windows", "MacOS", "فاقد سیستم عامل"],
  },
  operatingSystemVersion: {
    type: Number,
    required: false,
    min: 10,
    max: 15,
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
    max: 20,
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
  battery: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  batteryCapacity: {
    type: Number,
    required: true,
    min: 30,
    max: 150,
  },
  hasFingerprintSensor: {
    type: Boolean,
    required: true,
  },
}, { timestamps: true });

export default productModel.discriminator("Laptop", schema);