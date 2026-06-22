import express from "express";


import {
  getOrders,
  createOrder,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

router.get("/", verifyToken, getOrders);
router.post("/", verifyToken, createOrder);
router.put("/:id/status", verifyToken, updateOrderStatus);
const router = express.Router();

router.get("/", getOrders);

router.post("/", createOrder);

router.put(
  "/:id/status",
  updateOrderStatus
);

export default router;