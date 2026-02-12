import { get } from "mongoose";
import productModel from "../models/productModel.js";

export const getAllProducts = async () => {
  const products = await productModel.find();
  return { data: products, statusCode: 200 };
};

export const seedInitialProducts = async () => {
  try {
    const existingProducts = await getAllProducts();
    if (existingProducts.data.length > 0) {
      return { data: "Products already seeded", statusCode: 400 };
    }
    await productModel.insertMany([
      {
        title: "Apple iPhone 13",
        image: "https://example.com/iphone13.jpg",
        price: 999,
        stock: 50,
      },
      {
        title: "Samsung Galaxy S21",
        image: "https://example.com/galaxys21.jpg",
        price: 899,
        stock: 30,
      },
      {
        title: "Google Pixel 6",
        image: "https://example.com/pixel6.jpg",
        price: 799,
        stock: 20,
      },
      {
        title: "OnePlus 9 Pro",
        image: "https://example.com/oneplus9pro.jpg",
        price: 969,
        stock: 15,
      },
      {
        title: "Sony Xperia 1 III",
        image: "https://example.com/xperia1iii.jpg",
        price: 1199,
        stock: 10,
      },
      {
        title: "Xiaomi Mi 11",
        image: "https://example.com/mi11.jpg",
        price: 749,
        stock: 25,
      },
      {
        title: "Huawei P50 Pro",
        image: "https://example.com/p50pro.jpg",
        price: 899,
        stock: 18,
      },
      {
        title: "Asus ROG Phone 5",
        image: "https://example.com/rogphone5.jpg",
        price: 999,
        stock: 12,
      },
    ]);
    return { data: "Products seeded successfully", statusCode: 201 };
  } catch (error) {
    console.error("Error seeding products:", error);
    return { data: "Error seeding products", statusCode: 500 };
  }
};
