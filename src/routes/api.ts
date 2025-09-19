import express from "express";
import dummyController from "../controllers/dummy.controller.ts";
import authController from "../controllers/auth.controller.ts";

const router = express.Router();

// just for testing
router.get("/dummy", dummyController.dummy);

// auth
router.post("/auth/register", authController.register);

export default router;
