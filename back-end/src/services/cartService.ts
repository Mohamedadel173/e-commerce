import type { ObjectId } from "mongoose";
import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";

// create a new cart for a user
interface CartForUserParams {
    userId: ObjectId;
};

const createCartForUser = async ({ userId }: CartForUserParams) => {
    const cart = await cartModel.create({ userId, totalAmount: 0 });
    return cart;
};

// get active cart for a user
export const getActiveCartForUser = async ({ userId }: CartForUserParams) => {
    let cart = await cartModel.findOne({ userId, status: "active" });
    if (!cart) {
        cart = await createCartForUser({ userId });
    }
    return { data: cart, statusCode: 200 };
};

// add item to cart
interface AddItemToCartParams {
    userId: ObjectId;
    productId: any;
    quantity: number;
}

export const addItemToCart = async ({ userId, productId, quantity }: AddItemToCartParams) => {
     const { data } = await getActiveCartForUser({ userId });
     const cart = data;

    // Check if the product is already in the cart
    const existsInCart = cart.items.find(item => item.productId.toString() === productId);

    if (existsInCart){
        return { data: { message: "Product already in cart" }, statusCode: 400 };
    }
    // Fetch product
    const product = await productModel.findById(productId);

    if (!product) {
        return { data: { message: "Product not found" }, statusCode: 404 };
    }

    if (product.stock < quantity) {
        return { data: { message: "Insufficient stock" }, statusCode: 400 };
    }

    // Add item to cart
    cart.items.push({
        productId: product._id as unknown as ObjectId, //!!!
        unitPrice: product.price,
        quantity,
    });

    // Update total amount
    cart.totalAmount += product.price * quantity;

    // Save cart
    const updatedCart = await cart.save();

    return { data: updatedCart, statusCode: 200 };
};
