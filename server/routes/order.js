import { Router } from "express";

import authentication from "../middlewares/authentication.js";
import isBanned from "../middlewares/isBanned.js";
import isAdmin from "../middlewares/isAdmin.js";
import { create, getAll, get, deliver, cancel, return_ } from "../controllers/order.js";

const router = Router();

router.route("/").post(authentication, isBanned, create).get(authentication, isBanned, isAdmin, getAll);
router.get("/:id", authentication, isBanned, get);
router.put("/deliver/:id", authentication, isBanned, isAdmin, deliver);
router.put("/cancel/:id", authentication, isBanned, cancel);
router.put("/return/:id", authentication, isBanned, return_);

export default router;