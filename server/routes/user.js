import { Router } from "express";
import multer, { diskStorage } from "multer";
import { dirname, join, extname } from "path";
import { fileURLToPath } from "url";

import authentication from "../middlewares/authentication.js";
import isAdmin from "../middlewares/isAdmin.js";
import { getAll, edit, update, ban, unban, remove } from "../controllers/user.js";

const router = Router();
const uploader = multer({
  storage: diskStorage({
    destination: (request, file, callback) => callback(null, join(dirname(fileURLToPath(import.meta.url)), "..", "public", "users")),
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

router.route("/").get(authentication, isAdmin, getAll).put(uploader.single("avatar"), authentication, edit);
router.route("/:id").put(uploader.single("avatar"), authentication, isAdmin, update).delete(authentication, isAdmin, remove);
router.put("/ban/:id", authentication, isAdmin, ban);
router.put("/unban/:id", authentication, isAdmin, unban);

export default router;