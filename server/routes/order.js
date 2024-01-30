import { Router } from "express";

import authentication from "../middlewares/authentication.js";
import isAdmin from "../middlewares/isAdmin.js";
import { create, getAll, get, deliver, cancel, return_ } from "../controllers/order.js";

const router = Router();

router.route("/").post(authentication, create).get(authentication, isAdmin, getAll);
router.get("/:id", authentication, get);
router.put("/deliver/:id", authentication, isAdmin, deliver);
router.put("/cancel/:id", authentication, cancel);
router.put("/return/:id", authentication, return_);

export default router;