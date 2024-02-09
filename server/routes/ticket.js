import { Router } from "express";

import authentication from "../middlewares/authentication.js";
import isAdmin from "../middlewares/isAdmin.js";
import { create, reply, getAll, get, open, close, remove } from "../controllers/ticket.js";

const router = Router();

router.route("/").post(authentication, create).get(authentication, isAdmin, getAll);
router.post("/reply/:id", authentication, reply);
router.get("/:id", authentication, get);
router.put("/open/:id", authentication, isAdmin, open);
router.put("/close/:id", authentication, isAdmin, close);
router.delete("/:id", authentication, isAdmin, remove);

export default router;