import { Schema, Types, model } from "mongoose";

import validator from "../validators/category.js";

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
  },
  { timestamps: true }
);

schema.statics.validation = (body) => validator.validate(body);

export default model("Category", schema);