import { Router } from "express";

import multer from "../utilities/multer.js";
import authentication from "../middlewares/authentication.js";
import isBanned from "../middlewares/isBanned.js";
import isAdmin from "../middlewares/isAdmin.js";
import { create, getAll, get, update, remove } from "../controllers/product.js";

const router = Router();
const uploader = multer("products", 2 * 1024 * 1024, 4, ["image/png", "image/jpg", "image/jpeg"]);

router.route("/").post(authentication, isBanned, isAdmin, uploader.array("covers"), create).get(getAll);
router.route("/:id").get(get).put(authentication, isBanned, isAdmin, update).delete(authentication, isBanned, isAdmin, remove);

export default router;