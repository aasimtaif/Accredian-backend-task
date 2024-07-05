import express from "express";
import { getUser, getUsers, createReferral } from "../controllers/user.js";

const router = express.Router();

router.get("/:id", getUser);
router.get("/", getUsers);
router.get("/referral/:id", createReferral);

export default router
