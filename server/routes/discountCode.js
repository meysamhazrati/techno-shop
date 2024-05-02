import { Router } from "express";

import authentication from "../middlewares/authentication.js";
import isBanned from "../middlewares/isBanned.js";
import isAdmin from "../middlewares/isAdmin.js";
import { create, getAll, check, use, remove } from "../controllers/discountCode.js";

const router = Router();

router.route("/").post(authentication, isBanned, isAdmin, create).get(authentication, isBanned, isAdmin, getAll);
router.post("/check", authentication, isBanned, check);
router.post("/use/:id", authentication, isBanned, use);
router.delete("/:id", authentication, isBanned, isAdmin, remove);

export default router;