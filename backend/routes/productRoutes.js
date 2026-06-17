import express from "express";
import {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", addProduct);
router.get("/", getProducts);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);
export default router;