import { Router } from "express";
import multer, { diskStorage } from "multer";
import { extname } from "path";

import authentication from "../middlewares/authentication.js";
import isAdmin from "../middlewares/isAdmin.js";
import { create, getAll, get, update, remove } from "../controllers/product.js";

const router = Router();
const uploader = multer({
  storage: diskStorage({
    destination: (request, file, callback) => callback(null, "public/products/"),
    filename: (request, file, callback) => callback(null, Date.now() + Math.floor(Math.random() * 1000000000) + extname(file.originalname)),
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (request, file, callback) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
      callback(null, true);
    } else {
      callback(new Error("The file extension must be png, jpg or jpeg."), false);
    }
  },
});

router.route("/").post(uploader.array("covers", 4), authentication, isAdmin, create).get(getAll);
router.route("/:id").get(get).put(authentication, isAdmin, update).delete(authentication, isAdmin, remove);

export default router;