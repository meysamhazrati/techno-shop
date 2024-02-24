import jwt from "jsonwebtoken";
import { parse } from "cookie";

import model from "../models/user.js";

const middleware = async (request, response, next) => {
  try {
    const { token } = parse(request.headers.cookie || "");

    if (token) {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);

      const user = await model.findById(id, "-password -__v").populate([
        { path: "cart", populate: [
          { path: "product", select: "title warranty covers offer", populate: { path: "offer", select: "percent expiresAt" } },
          { path: "color", select: "price inventory name code" },
        ] },
        { path: "favorites", select: "title covers", populate: [
          { path: "colors", select: "price inventory name code" },
          { path: "brand", select: "name englishName" },
          { path: "category", select: "title englishTitle" },
          { path: "offer", select: "percent expiresAt" },
        ] },
        { path: "addresses", select: "-__v", options: { sort: { createdAt: -1 } } },
        { path: "orders", select: "shippingCost totalAmount status products.quantity products.product.title products.product.covers products.color.name products.color.code destination.province destination.city createdAt updatedAt", options: { sort: { createdAt: -1 } } },
        { path: "comments", select: "-isBuyer -__v", options: { sort: { createdAt: -1 } }, populate: [
          { path: "product", select: "title covers" },
          { path: "article", select: "title cover" },
        ] },
        { path: "articles", select: "-__v", options: { sort: { createdAt: -1 } }, populate: { path: "category", select: "title englishTitle" } },
        { path: "tickets", select: "-__v", match: { ticket: { $exists: false } }, options: { sort: { createdAt: -1 } } },
      ]).lean();

      if (user) {
        request.user = user;

        next();
      } else {
        throw Object.assign(new Error("The user was not found."), { status: 404 });
      }
    } else {
      throw Object.assign(new Error("You can't access this route."), { status: 403 });
    }
  } catch (error) {
    next(error);
  }
};

export default middleware;