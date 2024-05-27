import { Schema, Types, model } from "mongoose";

import validator from "../validators/favorite.js";

const schema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    product: {
      type: Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

schema.statics.validation = (body) => validator.validate(body);

export default model("Favorite", schema);