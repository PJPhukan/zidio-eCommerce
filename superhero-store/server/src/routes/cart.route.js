import { Router } from "express";

import { VerifyJwtToken } from "../libs/auth.helpers.js";
import {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  getCartItems,
} from "../controller/cart.controller.js";
const router = Router();


router.route("/add").post(VerifyJwtToken, addToCart);
router.route("/remove").post(VerifyJwtToken, removeFromCart);
router.route("/update").post(VerifyJwtToken, updateCartItemQuantity);
router.route("/").get(VerifyJwtToken, getCartItems);

export default router;