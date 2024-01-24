import { Schema, Types, model } from "mongoose";

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 100,
    },
    cover: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
      minLength: 100,
      maxLength: 10000,
    },
    isPublished: {
      type: Boolean,
      required: true,
    },
    author: {
      type: Types.ObjectId,
      ref: "User",
    },
    category: {
      type: Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

schema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "article",
});

export default model("Article", schema);