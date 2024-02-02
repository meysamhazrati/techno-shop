import { Router } from "express";

import authentication from "../middlewares/authentication.js";
import isAdmin from "../middlewares/isAdmin.js";
import { create, getAll, check, use, remove } from "../controllers/discountCode.js";

const router = Router();

router.route("/").post(authentication, isAdmin, create).get(authentication, isAdmin, getAll);
router.post("/check", authentication, check);
router.post("/use/:id", authentication, use);
router.delete("/:id", authentication, isAdmin, remove);

export default router;