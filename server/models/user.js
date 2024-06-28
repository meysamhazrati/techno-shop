import { Schema, Types, model } from "mongoose";

const schema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 70,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 70,
  },
  email: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 100,
    match: /^\w+([.-]?\w)*@\w+([.-]?\w)*\.[a-zA-Z]{2,4}$/,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["USER", "ADMIN"],
  },
  avatar: {
    type: String,
    required: false,
  },
  isBanned: {
    type: Boolean,
    required: false,
    default: false,
  },
  cart: [
    {
      quantity: {
        type: Number,
        required: false,
        default: 1,
      },
      product: {
        type: Types.ObjectId,
        ref: "Product",
      },
      color: {
        type: Types.ObjectId,
        ref: "Color",
      },
    },
  ],
}, { timestamps: true });

schema.virtual("addresses", {
  ref: "Address",
  localField: "_id",
  foreignField: "recipient",
});

schema.virtual("orders", {
  ref: "Order",
  localField: "_id",
  foreignField: "buyer._id",
});

schema.virtual("favorites", {
  ref: "Favorite",
  localField: "_id",
  foreignField: "user",
});

schema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "sender",
});

schema.virtual("tickets", {
  ref: "Ticket",
  localField: "_id",
  foreignField: "sender",
});

export { schema };
export default model("User", schema);