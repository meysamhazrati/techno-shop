import { Router } from "express";

import authentication from "../middlewares/authentication.js";
import isAdmin from "../middlewares/isAdmin.js";
import { create, reply, getAll, get, open, close } from "../controllers/ticket.js";

const router = Router();

router.route("/").post(authentication, create).get(authentication, isAdmin, getAll);
router.post("/reply/:id", authentication, reply);
router.get("/:id", authentication, get);
router.put("/open/:id").put(authentication, isAdmin, open);
router.put("/close/:id").put(authentication, isAdmin, close);

export default router;