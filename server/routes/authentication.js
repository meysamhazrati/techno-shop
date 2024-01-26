import { Router } from "express";

import authentication from "../middlewares/authentication.js";
import { send, verify, register, login, logout, me } from "../controllers/authentication.js";

const router = Router();

router.post("/send", send);
router.post("/verify", verify);
router.post("/register", register);
router.post("/login", login);
router.get("/me", authentication, me);
router.delete("/logout", authentication, logout);

export default router;