import { Schema, Types, model } from "mongoose";

import { create, update } from "../validators/product.js";

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 100,
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

schema.virtual("colors", {
  ref: "Color",
  localField: "_id",
  foreignField: "product",
});

schema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "product",
});

schema.statics.createValidation = (body) => create.validate(body);
schema.statics.updateValidation = (body) => update.validate(body);

export { schema };
export default model("Product", schema);