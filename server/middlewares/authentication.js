import jwt from "jsonwebtoken";
import { parse } from "cookie";

import userModel from "../models/user.js";

const middleware = async (request, response, next) => {
  try {
    const { token } = parse(request.headers.cookie || "");

    if (token) {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);

      const user = await userModel.findById(id, "-password -__v");

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