import express from "express";
import {
  register,
  login,
  getMe,
  sendOtp,
  verifyOtp,
} from "../controllers/authController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// OLD PHONE AUTH
router.post("/register", register);
router.post("/login", login);

// NEW EMAIL OTP AUTH
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

// USER
router.get("/me", verifyToken, getMe);

export default router;