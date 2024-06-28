import { Schema, Types, model } from "mongoose";

const schema = new Schema({
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    product: {
      type: Types.ObjectId,
      ref: "Product",
    },
  }, { timestamps: true });

export default model("Favorite", schema);