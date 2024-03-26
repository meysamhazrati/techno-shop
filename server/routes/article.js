import { Router } from "express";

import multer from "../utilities/multer.js";
import authentication from "../middlewares/authentication.js";
import isAdmin from "../middlewares/isAdmin.js";
import { create, getAll, get, update, publish, draft, confirm, reject, remove } from "../controllers/article.js";

const router = Router();
const uploader = multer("articles");

router.route("/").post(authentication, uploader.single("cover"), create).get(getAll);
router.route("/:id").get(get).put(authentication, uploader.single("cover"), update).delete(authentication, remove);
router.put("/publish/:id", authentication, publish);
router.put("/draft/:id", authentication, draft);
router.put("/confirm/:id", authentication, isAdmin, confirm);
router.put("/reject/:id", authentication, isAdmin, reject);

export default router;