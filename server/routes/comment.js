import { Router } from "express";

import authentication from "../middlewares/authentication.js";
import isBanned from "../middlewares/isBanned.js";
import isAdmin from "../middlewares/isAdmin.js";
import { create, getAll, confirm, reject, remove } from "../controllers/comment.js";

const router = Router();

router.route("/").post(authentication, isBanned, create).get(authentication, isBanned, isAdmin, getAll);
router.put("/confirm/:id", authentication, isBanned, isAdmin, confirm);
router.put("/reject/:id", authentication, isBanned, isAdmin, reject);
router.delete("/:id", authentication, isBanned, remove);

export default router;