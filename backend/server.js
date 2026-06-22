import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express(); // ✅ MUST BE FIRST

// middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://stylesatvika.netlify.app"
  ],
  credentials: true
}));

app.use(express.json());

// connect DB
connectDB();

// routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});