import { Schema, Types, model } from "mongoose";

import { create, update } from "../validators/offer.js";

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 100,
    },
    description: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 200,
    },
    percent: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    organizer: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

schema.statics.createValidation = (body) => create.validate(body);
schema.statics.updateValidation = (body) => update.validate(body);

export default model("Offer", schema);