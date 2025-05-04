import { Router } from "express";

import { VerifyJwtToken } from "../libs/auth.helpers.js";

import {
    addAddress,
    deleteAddress,
    getAddress,
    updateAddress,
    getAllAddress,
} from "../controller/address.controller.js";
const router = Router();
router.route("/add").post(VerifyJwtToken, addAddress);
router.route("/get/:id").get(VerifyJwtToken, getAddress);
router.route("/update/:id").put(VerifyJwtToken, updateAddress);
router.route("/delete/:id").delete(VerifyJwtToken, deleteAddress);
router.route("/getAll").get(VerifyJwtToken, getAllAddress);


export default router;