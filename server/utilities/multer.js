import multer, { diskStorage } from "multer";
import { extname } from "path";

const utility = (directory) => multer({
    storage: diskStorage({
      destination: (request, file, callback) => callback(null, `public/${directory}/`),
      filename: (request, file, callback) => callback(null, `${Date.now() + Math.floor(Math.random() * 1000000000)}${extname(file.originalname)}`),
    }),
    limits: { fileSize: 20 * 1024 * 1024 },
    fileFilter: (request, file, callback) => {
      if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        callback(null, true);
      } else {
        callback(Object.assign(new Error("The file extension must be png, jpg or jpeg."), { status: 400 }), false);
      }
    },
  });

export default utility;