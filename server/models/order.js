import { Schema, model } from "mongoose";

import { schema as productSchema } from "../models/product.js";
import { schema as colorSchema } from "../models/color.js";
import { schema as userSchema } from "../models/user.js";
import { schema as addressSchema } from "../models/address.js";
import { schema as discountCodeSchema } from "../models/discountCode.js";

const schema = new Schema({
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    required: false,
    default: "جاری",
  },
  products: [
    {
      quantity: {
        type: Number,
        required: true,
        min: 1,
        max: 100,
      },
      product: {
        type: productSchema,
      },
      color: {
        type: colorSchema,
      },
    },
  ],
  buyer: {
    type: userSchema,
  },
  destination: {
    type: addressSchema,
  },
  discountCode: {
    type: discountCodeSchema,
  },
}, { timestamps: true });

export default model("Order", schema);