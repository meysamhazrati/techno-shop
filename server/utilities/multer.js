import multer, { diskStorage } from "multer";
import { mkdirSync } from "fs";
import { extname } from "path";

const utility = (directory, sizeLimit, countLimit, types) => multer({
  storage: diskStorage({
    destination: (request, file, callback) => {
      mkdirSync(`public/images/${directory}`, { recursive: true });
      
      return callback(null, `public/images/${directory}`);
    },
    filename: (request, file, callback) => callback(null, `${new Date().toISOString().slice(0, 10)}_${Array(7).fill().map(() => Math.floor(Math.random() * 10)).join("")}${extname(file.originalname)}`),
  }),
  limits: { fileSize: sizeLimit, files: countLimit },
  fileFilter: (request, file, callback) => types.includes(file.mimetype) ? callback(null, true) : callback(Object.assign(new Error(`فرمت فایل باید ${types.map(type => type.split("/")[1].toUpperCase()).slice(0, types.length - 1).join("، ")} یا ${types[types.length - 1].split("/")[1].toUpperCase()} باشد.`), { status: 400 }), false),
});

export default utility;