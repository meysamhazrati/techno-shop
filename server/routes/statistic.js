import { Router } from "express";

import authentication from "../middlewares/authentication.js";
import isBanned from "../middlewares/isBanned.js";
import isAdmin from "../middlewares/isAdmin.js";
import { getAll } from "../controllers/statistic.js";

const router = Router();

router.get("/", authentication, isBanned, isAdmin, getAll);

export default router;