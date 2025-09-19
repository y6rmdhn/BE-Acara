import express from "express";
import authController from "../controllers/auth.controller";

const router = express.Router();

// auth
router.post("/auth/register", authController.register);

export default router;
