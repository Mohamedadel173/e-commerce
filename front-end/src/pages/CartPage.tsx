import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import { useAuthContext } from "../context/auth/AuthContext";
import { BASE_URL } from "../constants/baseUrl";

export default function CartPage() {
  const { token } = useAuthContext();
  const [cartItems, setCartItems] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!token) {
        
      return;
    }

    const fetchCartItems = async () => {
      const res = await fetch(`${BASE_URL}/cart`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      
      if (!res.ok) {
        setErr(data || "Failed to fetch cart items");
        return;
      }
      setCartItems(data);
    };

    fetchCartItems();
  }, [token]);

  console.log("Cart Items:", cartItems); //? for debugging purposes
  console.log("Error:", err); //? for debugging purposes
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h6">My Cart</Typography>
    </Container>
  );
}
