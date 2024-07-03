import { Router } from "express";

import multer from "../utilities/multer.js";
import authentication from "../middlewares/authentication.js";
import isBanned from "../middlewares/isBanned.js";
import isAdmin from "../middlewares/isAdmin.js";
import { create, getAll, get, update, remove } from "../controllers/brand.js";

const router = Router();
const uploader = multer("brands", 2 * 1024 * 1024, 1, ["image/png", "image/jpg", "image/jpeg"]);

router.route("/").post(authentication, isBanned, isAdmin, uploader.single("logo"), create).get(getAll);
router.get("/:name", get);
router.route("/:id").put(authentication, isBanned, isAdmin, uploader.single("logo"), update).delete(authentication, isBanned, isAdmin, remove);

export default router;