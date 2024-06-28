import { Router } from "express";

import { send, verify } from "../controllers/otp.js";

const router = Router();

router.post("/", send);
router.post("/verify", verify);

export default router;