import multer, { diskStorage } from "multer";
import { mkdirSync } from "fs";
import { extname } from "path";

const utility = (directory) => multer({
  storage: diskStorage({
    destination: (request, file, callback) => {
      mkdirSync(`public/images/${directory}`, { recursive: true });
      
      return callback(null, `public/images/${directory}`);
    },
    filename: (request, file, callback) => callback(null, `${new Date().toISOString().slice(0, 10)}_${Array(7).fill().map(() => Math.floor(Math.random() * 10)).join("")}${extname(file.originalname)}`),
  }),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (request, file, callback) => file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" ? callback(null, true) : callback(Object.assign(new Error("فرمت عکس باید PNG، JPG یا JPEG باشد."), { status: 400 }), false),
});

export default utility;