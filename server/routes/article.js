import { Router } from "express";

import multer from "../utilities/multer.js";
import authentication from "../middlewares/authentication.js";
import { create, getAll, get, update, publish, draft, remove } from "../controllers/article.js";

const router = Router();
const uploader = multer("articles");

router.route("/").post(authentication, uploader.single("cover"), create).get(getAll);
router.route("/:id").get(get).put(authentication, uploader.single("cover"), update).delete(authentication, remove);
router.put("/publish/:id", authentication, publish);
router.put("/draft/:id", authentication, draft);

export default router;