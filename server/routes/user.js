import { Router } from "express";

import multer from "../utilities/multer.js";
import authentication from "../middlewares/authentication.js";
import isAdmin from "../middlewares/isAdmin.js";
import { getAll, edit, update, ban, unban, remove } from "../controllers/user.js";

const router = Router();
const uploader = multer("users");

router.route("/").get(authentication, isAdmin, getAll).put(authentication, uploader.single("avatar"), edit);
router.route("/:id").put(authentication, isAdmin, uploader.single("avatar"), update).delete(authentication, isAdmin, remove);
router.put("/ban/:id", authentication, isAdmin, ban);
router.put("/unban/:id", authentication, isAdmin, unban);

export default router;