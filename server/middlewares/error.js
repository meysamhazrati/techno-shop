import jwt from "jsonwebtoken";
import { MulterError } from "multer";
import { ValidationError } from "yup";

const middleware = (error, request, response, next) => {
  let { status = 500, message = "مشکلی پیش آمد! لطفا بعدا دوباره تلاش کنید." } = error;

  if (error instanceof jwt.JsonWebTokenError) {
    status = 401;

    if (error instanceof jwt.TokenExpiredError) {
      message = "توکن شما منقضی شده است.";
    } else {
      message = "توکن شما نامعتبر شده است.";
    }
  } else if (error instanceof MulterError) {
    status = 400;

    if (error.code === "LIMIT_FILE_SIZE") {
      status = 413;
      message = "حجم فایل(های) آپلود شده بیشتر از حد مجاز است.";
    } else if (error.code === "LIMIT_FILE_COUNT") {
      message = "تعداد فایل(های) آپلود شده بیشتر از حد مجاز است.";
    }
  } else if (error instanceof ValidationError) {
    status = 400;
  }

  response.status(status).json({ message });
};

export default middleware;