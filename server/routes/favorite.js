import { Router } from "express";

import authentication from "../middlewares/authentication.js";
import isBanned from "../middlewares/isBanned.js";
import { create, remove } from "../controllers/favorite.js";

const router = Router();

router.post("/", authentication, isBanned, create);
router.delete("/:id", authentication, isBanned, remove);

export default router;