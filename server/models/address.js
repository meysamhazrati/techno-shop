import { Schema, Types, model } from "mongoose";

const schema = new Schema({
  province: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
  },
  city: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
  },
  postalCode: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 10,
  },
  body: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 100,
  },
  recipient: {
    type: Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });

export { schema };
export default model("Address", schema);