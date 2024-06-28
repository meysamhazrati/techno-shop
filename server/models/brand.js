import { Schema, model } from "mongoose";

const schema = new Schema({
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
}, { timestamps: true });

schema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "brand",
});

export default model("Brand", schema);