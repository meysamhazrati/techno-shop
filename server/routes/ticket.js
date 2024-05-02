import { Router } from "express";

import authentication from "../middlewares/authentication.js";
import isBanned from "../middlewares/isBanned.js";
import isAdmin from "../middlewares/isAdmin.js";
import { create, reply, getAll, get, open, close, remove } from "../controllers/ticket.js";

const router = Router();

router.route("/").post(authentication, isBanned, create).get(authentication, isBanned, isAdmin, getAll);
router.post("/reply/:id", authentication, isBanned, reply);
router.get("/:id", authentication, isBanned, get);
router.put("/open/:id", authentication, isBanned, isAdmin, open);
router.put("/close/:id", authentication, isBanned, isAdmin, close);
router.delete("/:id", authentication, isBanned, isAdmin, remove);

export default router;