import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import connectDB from "./config/db.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import adminOrderRoutes from "./routes/adminOrderRoutes.js";
dotenv.config();

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
// Product Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.get("/", (req, res) => {
  res.send("Backend Running");
});
app.use("/api/auth", authRoutes);
const PORT = process.env.PORT || 5000;
app.use("/api/admin/orders", adminOrderRoutes);

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});