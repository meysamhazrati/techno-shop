import { Router } from "express";

import authentication from "../middlewares/authentication.js";
import isBanned from "../middlewares/isBanned.js";
import isAdmin from "../middlewares/isAdmin.js";
import { create, getAll, update, remove } from "../controllers/address.js";

const router = Router();

router.route("/").post(authentication, isBanned, create).get(authentication, isBanned, isAdmin, getAll);
router.route("/:id").put(authentication, isBanned, update).delete(authentication, isBanned, remove);

export default router;