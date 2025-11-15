import {Router} from "express"
import { hadnleGoogleLogin, getProfile } from "../controllers/auth.controller.js";

const router = Router();

router.post("/google", hadnleGoogleLogin)
router.post("/profile", getProfile)

export default router;