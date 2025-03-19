import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/AuthController";

const router = express.Router();


router.get("/logout", logoutUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
export default router;
