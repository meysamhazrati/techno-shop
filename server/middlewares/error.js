import jwt from "jsonwebtoken";
import { MulterError } from "multer";
import { ValidationError } from "yup";

const middleware = (error, request, response, next) => {
  let { status = 500, message = "Unexpected error." } = error;

  if (error instanceof jwt.JsonWebTokenError) {
    status = 401;

    if (error instanceof jwt.TokenExpiredError) {
      message = "The token has expired.";
    } else {
      message = "The token is invalid.";
    }
  } else if (error instanceof MulterError) {
    status = 400;

    if (error.code === "LIMIT_FILE_SIZE") {
      status = 413;
      message = "The size of uploaded files exceeds the allowed limit.";
    } else if (error.code === "LIMIT_FILE_COUNT") {
      message = "The number of uploaded files exceeds the allowed limit.";
    }
  } else if (error instanceof ValidationError) {
    status = 400;
  }

  response.status(status).json({ message });
};

export default middleware;