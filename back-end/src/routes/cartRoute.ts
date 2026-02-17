import express from "express";
import {
  addItemToCart,
  getActiveCartForUser,
  updateCartItem,
  removeCartItem,
  clearCart,
  checkout,
} from "../services/cartService.js";
import { validateJWT } from "../middlewares/validateJWT.js";
import type { ExtendRequest } from "../types/extendedRequest.js";

const router = express.Router();

router.get("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const { statusCode, data } = await getActiveCartForUser({ userId, populateProducts: true });
    res.status(statusCode).json(data);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json("Internal Server Error");
  }
});

router.post("/items", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    // Call service to add item to cart
    const { statusCode, data } = await addItemToCart({
      userId,
      productId,
      quantity,
    });
    res.status(statusCode).json(data);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json("Internal Server Error");
  }
});

router.put("/items", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    // Call service to update item quantity in cart
    const { statusCode, data } = await updateCartItem({
      userId,
      productId,
      quantity,
    });
    res.status(statusCode).json(data);
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json("Internal Server Error");
  }
});

router.delete(
  "/items/:productId",
  validateJWT,
  async (req: ExtendRequest, res) => {
    try {
      const userId = req.user._id;
      const { productId } = req.params;
      const { statusCode, data } = await removeCartItem({
        userId,
        productId,
      });
      res.status(statusCode).json(data);
    } catch (error) {
      console.error("Error removing cart item:", error);
      res.status(500).json("Internal Server Error");
    }
  },
);

router.delete("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const { statusCode, data } = await clearCart({
      userId,
    });
    res.status(statusCode).json(data);
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json("Internal Server Error");
  }
});

router.post("/checkout", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const { address } = req.body; //? Assuming the address is temporarily sent in the request body for simplification
    const { statusCode, data } = await checkout({ userId, address });
    res.status(statusCode).json(data);
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json("Internal Server Error");
  }
});
export default router;
