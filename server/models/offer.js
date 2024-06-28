import { Schema, Types, model } from "mongoose";

const schema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 100,
  },
  englishTitle: {
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
}, { timestamps: true });

schema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "offer",
});

export default model("Offer", schema);