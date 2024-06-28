import jwt from "jsonwebtoken";
import { parse } from "cookie";

import userModel from "../models/user.js";

const middleware = async (request, response, next) => {
  try {
    const { token } = parse(request.headers.cookie || "");

    if (token) {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);

      const user = await userModel.findById(id, "-password -__v").lean();

      if (user) {
        request.user = user;

        return next();
      }
    }

    throw Object.assign(new Error("شما دسترسی لازم به مسیر مورد نظر را ندارید."), { status: 403 });
  } catch (error) {
    next(error);
  }
};

export default middleware;