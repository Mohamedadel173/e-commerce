import { Container, Grid } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { BASE_URL } from "../constants/baseUrl";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    // Fetch products from the backend API
    // fetch(`${BASE_URL}/products`).then(async (response) => {
    //   const data = await response.json();
    //   console.log("Fetched products:", data);
    //   setProducts(data); // Assuming the API returns { data: products }
    // });
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/products`);
        const data = await response.json();
        setProducts(data);
        fetchProducts();
      } catch (err) {
        console.error("Failed to fetch:", err);
        setError(true);
      }
    };
    fetchProducts();
  }, []);

  if (error) {
    return <div>Error fetching products. Please try again later.</div>;
  }

  return (
    <Container sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product._id}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
