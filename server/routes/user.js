import { Router } from "express";

import multer from "../utilities/multer.js";
import authentication from "../middlewares/authentication.js";
import isBanned from "../middlewares/isBanned.js";
import isAdmin from "../middlewares/isAdmin.js";
import { getAll, get, edit, update, addToCart, removeFromCart, emptyCart, ban, unBan, remove } from "../controllers/user.js";

const router = Router();
const uploader = multer("users");

router.route("/").get(authentication, isBanned, isAdmin, getAll).put(authentication, isBanned, uploader.single("avatar"), edit);
router.route("/:id").get(authentication, isBanned, isAdmin, get).put(authentication, isBanned, isAdmin, uploader.single("avatar"), update).delete(authentication, isBanned, isAdmin, remove);
router.put("/cart/add/:id", authentication, isBanned, addToCart);
router.put("/cart/remove/:id", authentication, isBanned, removeFromCart);
router.put("/cart/empty", authentication, isBanned, emptyCart);
router.put("/ban/:id", authentication, isBanned, isAdmin, ban);
router.put("/un-ban/:id", authentication, isBanned, isAdmin, unBan);

export default router;