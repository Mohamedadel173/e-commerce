// Entry point of the application
import express from "express";
const app = express(); // Create an Express application
app.use(express.json()); // Middleware to parse JSON request bodies

// Load environment variables
import dotenv from "dotenv";
dotenv.config();

// Connect to MongoDB
import mongoose from "mongoose";
mongoose
  .connect(process.env.MONGODB_URI || "")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Seed initial products
import { seedInitialProducts } from "./services/productService.js";
seedInitialProducts();

// Routes
import userRouter from "./routes/userRoute.js";
app.use("/user", userRouter);
import productRouter from "./routes/productRoute.js";
app.use("/products", productRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
