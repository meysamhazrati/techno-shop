import { Router } from "express";

import authentication from "../middlewares/authentication.js";
import isAdmin from "../middlewares/isAdmin.js";
import { create, getAll, get, update, remove } from "../controllers/category.js";

const router = Router();

router.route("/").post(authentication, isAdmin, create).get(getAll);
router.get("/:title", get);
router.route("/:id").put(authentication, isAdmin, update).delete(authentication, isAdmin, remove);

export default router;