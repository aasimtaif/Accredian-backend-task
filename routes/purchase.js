import express from "express";
import { createPurchase, getPurchases, getPurchase } from "../controllers/purchase.js";

const router = express.Router();

router.post("/", createPurchase);
router.get("/", getPurchases);
router.get("/:id", getPurchase);

export default router