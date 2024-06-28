import { Router } from "express";

import authentication from "../middlewares/authentication.js";
import isBanned from "../middlewares/isBanned.js";
import { register, login, resetPassword, me, logout } from "../controllers/authentication.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.put("/reset-password", resetPassword);
router.get("/me", authentication, isBanned, me);
router.delete("/logout", authentication, logout);

export default router;