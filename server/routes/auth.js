import {Router} from "express"
import { hadnleGoogleLogin } from "../controllers/auth.controller.js";

const router = Router();


router.post("/google", hadnleGoogleLogin)

export default router;