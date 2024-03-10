import { Schema, Types, model } from "mongoose";

const schema = new Schema(
  {
    price: {
      type: Number,
      required: true,
      min: 1000,
      max: 1000000000,
    },
    sales: {
      type: Number,
      default: 0,
    },
    inventory: {
      type: Number,
      required: true,
      min: 1,
      max: 100000,
    },
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 15,
    },
    code: {
      type: String,
      required: true,
    },
    product: {
      type: Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

export { schema };
export default model("Color", schema);