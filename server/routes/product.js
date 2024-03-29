import { Router } from "express";

import multer from "../utilities/multer.js";
import authentication from "../middlewares/authentication.js";
import isAdmin from "../middlewares/isAdmin.js";
import { create, getAll, getByCategory, getByOffer, getBySearch, get, update, remove } from "../controllers/product.js";

const router = Router();
const uploader = multer("products");

router.route("/").post(authentication, isAdmin, uploader.array("covers", 4), create).get(getAll);
router.get("/categories/:title", getByCategory);
router.get("/offers/:id", getByOffer);
router.get("/search/:title", getBySearch);
router.route("/:id").get(get).put(authentication, isAdmin, update) .delete(authentication, isAdmin, remove);

export default router;