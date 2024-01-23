import { Schema, model } from "mongoose";

import validator from "../validators/brand.js";

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    englishName: {
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

schema.statics.validation = (body) => validator.validate(body);

export default model("Brand", schema);