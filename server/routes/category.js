import { Router } from "express";

import multer from "../utilities/multer.js";
import authentication from "../middlewares/authentication.js";
import isAdmin from "../middlewares/isAdmin.js";
import { create, getAll, get, update, remove } from "../controllers/category.js";

const router = Router();
const uploader = multer("categories");

router.route("/").post(authentication, isAdmin, uploader.single("logo"), create).get(getAll);
router.get("/:title", get);
router.route("/:id").put(authentication, isAdmin, uploader.single("logo"), update).delete(authentication, isAdmin, remove);

export default router;