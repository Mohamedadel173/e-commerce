import express from "express";
import { getAllProducts } from "../services/productService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { statusCode, data } = await getAllProducts();
    res.status(statusCode).send(data);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
