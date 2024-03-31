import { Schema, model } from "mongoose";

import { create, update } from "../validators/category.js";

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    englishTitle: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    logo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

schema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "category",
});

schema.statics.createValidation = (body) => create.validate(body);
schema.statics.updateValidation = (body) => update.validate(body);

export default model("Category", schema);