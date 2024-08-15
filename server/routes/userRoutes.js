import express from "express";
import {
  Login,
  createAccount,
  getUserOrder,
  postCartOrder,
  updateProfile,
  verifyUser,
} from "../controller/userController.js";
const router = express.Router();

router.post("/create-account", createAccount);
router.post("/login", Login);
router.post("/checkout", verifyUser, postCartOrder);
router.post("/getOrder", verifyUser, getUserOrder);
router.patch("/updateProfile", verifyUser, updateProfile);
export default router;
