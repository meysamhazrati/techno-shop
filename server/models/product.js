import { Schema, Types, model } from "mongoose";

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      max: 10000000000,
    },
    inventory: {
      type: Number,
      required: true,
      min: 0,
      max: 1000000,
      default: 0,
    },
    warranty: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    covers: [
      {
        type: String,
      },
    ],
    colors: [
      {
        type: String,
      },
    ],
    brand: {
      type: Types.ObjectId,
      ref: "Brand",
    },
    category: {
      type: Types.ObjectId,
      ref: "Category",
    },
    offer: {
      type: Types.ObjectId,
      ref: "Offer",
    },
  },
  { timestamps: true }
);

schema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "product",
});

export default model("Product", schema);