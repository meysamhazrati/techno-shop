import { Router } from "express";

import authentication from "../middlewares/authentication.js";
import isAdmin from "../middlewares/isAdmin.js";
import { create, getAll, confirm, reject, remove } from "../controllers/comment.js";

const router = Router();

router.route("/").post(authentication, create).get(authentication, isAdmin, getAll);
router.put("/confirm/:id", authentication, isAdmin, confirm);
router.put("/reject/:id", authentication, isAdmin, reject);
router.delete("/:id", authentication, remove);

export default router;