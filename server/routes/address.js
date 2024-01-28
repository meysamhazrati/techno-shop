import { Router } from "express";

import authentication from "../middlewares/authentication.js";
import { create, update, remove } from "../controllers/address.js";

const router = Router();

router.route("/").post(authentication, create);
router.route("/:id").put(authentication, update).delete(authentication, remove);

export default router;