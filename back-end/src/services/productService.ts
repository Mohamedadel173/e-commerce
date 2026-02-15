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
        image:
          "https://eshop.vodafone.com.eg/ecommerce/api/asset/content/iPhone13black_big.png?contextRequest=%7B%22forceCatalogForFetch%22:false,%22forceFilterByCatalogIncludeInheritance%22:false,%22forceFilterByCatalogExcludeInheritance%22:false,%22applicationId%22:%2201H5FECVAV4YWT0NGQKXEN1T51%22,%22tenantId%22:%225DF1363059675161A85F576D%22%7D",
        price: 999,
        stock: 50,
      },
      {
        title: "Samsung Galaxy S21",
        image:
          "https://kw.revibe.me/cdn/shop/files/PhantomGray.png?v=1712219412",
        price: 899,
        stock: 30,
      },
      {
        title: "Google Pixel 6",
        image:
          "https://static0.xdaimages.com/wordpress/wp-content/uploads/2021/08/Google-Pixel-6-series-portfolio-shot.jpg?w=1200&h=900&fit=crop",
        price: 799,
        stock: 20,
      },
      {
        title: "OnePlus 9 Pro",
        image:
          "data:image/jpeg;base64,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",
        price: 969,
        stock: 15,
      },
      {
        title: "Sony Xperia 1 III",
        image:
          "https://mobicee.com/wp-content/uploads/2021/04/Sony-Xperia-1-III.jpg",
        price: 1199,
        stock: 10,
      },
    ]);
    return { data: "Products seeded successfully", statusCode: 201 };
  } catch (error) {
    console.error("Error seeding products:", error);
    return { data: "Error seeding products", statusCode: 500 };
  }
};
