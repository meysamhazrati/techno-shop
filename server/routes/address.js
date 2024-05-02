import { Router } from "express";

import authentication from "../middlewares/authentication.js";
import isBanned from "../middlewares/isBanned.js";
import { create, update, remove } from "../controllers/address.js";

const router = Router();

router.route("/").post(authentication, isBanned, create);
router.route("/:id").put(authentication, isBanned, update).delete(authentication, isBanned, remove);

export default router;