import { Schema, Types, model } from "mongoose";

import validator from "../validators/order.js";

const schema = new Schema(
  {
    shippingCost: {
      type: Number,
      required: true,
      min: 0,
      max: 10000000,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
      max: 10000000000,
    },
    status: {
      type: String,
      required: false,
      default: "In progress",
    },
    products: [
      {
        quantity: {
          type: Number,
          required: true,
          min: 1,
          max: 100,
        },
        color: {
          type: String,
          required: true,
        },
        product: {
          type: Types.ObjectId,
          ref: "Product",
        },
      },
    ],
    buyer: {
      type: Types.ObjectId,
      ref: "User",
    },
    destination: {
      type: Types.ObjectId,
      ref: "Address",
    },
    discountCode: {
      type: Types.ObjectId,
      ref: "DiscountCode",
    },
  },
  { timestamps: true }
);

schema.statics.validation = (body) => validator.validate(body);

export default model("Order", schema);