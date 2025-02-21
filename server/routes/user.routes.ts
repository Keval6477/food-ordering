import express from "express";
import {
  checkAuth,
  forgotPassword,
  login,
  logout,
  resetPassword,
  signup,
  updateProfile,
  verifyEmail,
} from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();
router.get("/check-auth", isAuthenticated as any, checkAuth as any);
router.post("/signup", signup as any);
router.post("/login", login as any);
router.post("/logout", logout as any);
router.post("/verify-email", verifyEmail as any);
router.post("/forgot-password", forgotPassword as any);
router.post("/reset-password/:token", resetPassword as any);
router.put("/profile/update", isAuthenticated as any, updateProfile as any);

export default router;
