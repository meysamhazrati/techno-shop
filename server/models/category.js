import { Schema, model } from "mongoose";

const schema = new Schema({
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
}, { timestamps: true });

schema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "category",
});

export default model("Category", schema);