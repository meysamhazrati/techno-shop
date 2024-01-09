import jwt from "jsonwebtoken";
import { parse } from "cookie";

import userModel from "../models/user.js";

const middleware = async (request, response, next) => {
  const { token } = parse(request.headers.cookie || "");

  if (token) {
    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);

      const user = await userModel.findById(id, "-password -__v").lean();

      if (user) {
        request.user = user;

        next();
      } else {
        response.status(404).json({ message: "User not found." });
      }
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        error.status = 401;
        error.message = "The token has expired.";
      } else if (error instanceof jwt.JsonWebTokenError) {
        error.status = 401;
        error.message = "The token is invalid.";
      }

      next(error);
    }
  } else {
    response.status(403).json({ message: "This route is protected and you can't access it." });
  }
};

export default middleware;