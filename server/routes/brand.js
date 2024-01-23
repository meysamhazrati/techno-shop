import { Router } from "express";
import multer, { diskStorage } from "multer";
import { extname } from "path";

import authentication from "../middlewares/authentication.js";
import isAdmin from "../middlewares/isAdmin.js";
import { create, getAll, update, remove } from "../controllers/brand.js";

const router = Router();
const uploader = multer({
  storage: diskStorage({
    destination: (request, file, callback) => callback(null, "public/brands/"),
    filename: (request, file, callback) => callback(null, Date.now() + extname(file.originalname)),
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

router.route("/").post(uploader.single("logo"), authentication, isAdmin, create).get(getAll);
router.route("/:id").put(uploader.single("logo"), authentication, isAdmin, update).delete(authentication, isAdmin, remove);

export default router;