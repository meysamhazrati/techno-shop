import { Schema, model } from "mongoose";

import { create, update } from "../validators/brand.js";

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

schema.statics.createValidation = (body) => create.validate(body);
schema.statics.updateValidation = (body) => update.validate(body);

export default model("Brand", schema);