import express from "express";
import { getAllProducts } from "../services/productService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { statusCode, data } = await getAllProducts();
  res.status(statusCode).send(data);
});

export default router;