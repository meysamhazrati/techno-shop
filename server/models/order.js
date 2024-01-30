import { Schema, Types, model } from "mongoose";

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

export default model("Order", schema);