import { Router } from "express";

import { VerifyJwtToken } from "../libs/auth.helpers.js";
import {
  Login,
  loginWithSocialMedia,
  register,
  registerWithSocialMedia,
  forgotPassword,
  verifyOTP,
  resetPassword,
} from "../controller/user.controller.js";
const router = Router();

router.route("/register").post(register);
router.route("/login").post(Login);
router.route("/register-social").post(registerWithSocialMedia);
router.route("/login-social").post(loginWithSocialMedia);
router.route("/forgot-email").post(forgotPassword);
router.route("/forgot-verify-otp").post(verifyOTP);
router.route("/forgot-reset-password").post(resetPassword);

export default router;
