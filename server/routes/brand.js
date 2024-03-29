import { Router } from "express";

import multer from "../utilities/multer.js";
import authentication from "../middlewares/authentication.js";
import isAdmin from "../middlewares/isAdmin.js";
import { create, getAll, update, remove } from "../controllers/brand.js";

const router = Router();
const uploader = multer("brands");

router.route("/").post(authentication, isAdmin, uploader.single("logo"), create).get(getAll);
router.route("/:id").put(authentication, isAdmin, uploader.single("logo"), update).delete(authentication, isAdmin, remove);

export default router;