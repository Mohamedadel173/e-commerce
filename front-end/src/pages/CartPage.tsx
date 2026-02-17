import { Container, Typography } from "@mui/material";
import { useCartContext } from "../context/cart/CartContext";
import type { CartItem } from "../types/CartItem";

export default function CartPage() {
  const { cartItems } = useCartContext();

  if (!cartItems) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>Loading your cart...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h6">My Cart</Typography>
      {/* Display cart items */}
      {cartItems.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        cartItems.map((item: CartItem) => (
          <div key={item.productId}>
            <Typography>{item.title}</Typography>
          </div>
        ))
      )}
    </Container>
  );
}
