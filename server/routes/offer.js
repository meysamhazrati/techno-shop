import { Router } from "express";

import authentication from "../middlewares/authentication.js";
import isBanned from "../middlewares/isBanned.js";
import isAdmin from "../middlewares/isAdmin.js";
import { create, getAll, get, update, remove } from "../controllers/offer.js";

const router = Router();

router.route("/").post(authentication, isBanned, isAdmin, create).get(getAll);
router.get("/:title", get);
router.route("/:id").put(authentication, isBanned, isAdmin, update).delete(authentication, isBanned, isAdmin, remove);

export default router;