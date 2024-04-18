import { Router } from "express";

import multer from "../utilities/multer.js";
import authentication from "../middlewares/authentication.js";
import isAdmin from "../middlewares/isAdmin.js";
import { getAll, get, edit, update, addToCart, removeFromCart, emptyCart, addToFavorites, removeFromFavorites, emptyFavorites, ban, unBan, remove } from "../controllers/user.js";

const router = Router();
const uploader = multer("users");

router.route("/").get(authentication, isAdmin, getAll).put(authentication, uploader.single("avatar"), edit);
router.route("/:id").get(authentication, isAdmin, get).put(authentication, isAdmin, uploader.single("avatar"), update).delete(authentication, isAdmin, remove);
router.put("/cart/add/:id", authentication, addToCart);
router.put("/cart/remove/:id", authentication, removeFromCart);
router.put("/cart/empty", authentication, emptyCart);
router.put("/favorites/add/:id", authentication, addToFavorites);
router.put("/favorites/remove/:id", authentication, removeFromFavorites);
router.put("/favorites/empty", authentication, emptyFavorites);
router.put("/ban/:id", authentication, isAdmin, ban);
router.put("/un-ban/:id", authentication, isAdmin, unBan);

export default router;