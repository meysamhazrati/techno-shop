import { Router } from "express";

import multer from "../utilities/multer.js";
import authentication from "../middlewares/authentication.js";
import isBanned from "../middlewares/isBanned.js";
import isAdmin from "../middlewares/isAdmin.js";
import { create, getAll, get, update, publish, draft, remove } from "../controllers/article.js";

const router = Router();
const uploader = multer("articles", 2 * 1024 * 1024, 1, ["image/png", "image/jpg", "image/jpeg"]);

router.route("/").post(authentication, isBanned, isAdmin, uploader.single("cover"), create).get(getAll);
router.route("/:id").get(get).put(authentication, isBanned, isAdmin, uploader.single("cover"), update).delete(authentication, isBanned, isAdmin, remove);
router.put("/publish/:id", authentication, isBanned, isAdmin, publish);
router.put("/draft/:id", authentication, isBanned, isAdmin, draft);

export default router;