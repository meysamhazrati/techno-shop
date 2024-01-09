import { Router } from "express";

import authentication from "../middlewares/authentication.js";
import { register, login, me } from "../controllers/authentication.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authentication, me);

export default router;