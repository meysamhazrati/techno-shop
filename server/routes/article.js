import { Router } from "express";

import multer from "../utilities/multer.js";
import authentication from "../middlewares/authentication.js";
import isBanned from "../middlewares/isBanned.js";
import isAdmin from "../middlewares/isAdmin.js";
import { create, getAll, get, update, publish, draft, confirm, reject, remove } from "../controllers/article.js";

const router = Router();
const uploader = multer("articles");

router.route("/").post(authentication, isBanned, uploader.single("cover"), create).get(getAll);
router.route("/:id").get(get).put(authentication, isBanned, uploader.single("cover"), update).delete(authentication, isBanned, remove);
router.put("/publish/:id", authentication, isBanned, publish);
router.put("/draft/:id", authentication, isBanned, draft);
router.put("/confirm/:id", authentication, isBanned, isAdmin, confirm);
router.put("/reject/:id", authentication, isBanned, isAdmin, reject);

export default router;