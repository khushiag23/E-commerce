import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// Sample cart items
const initialCart = [
  {
    id: 1,
    name: "T-shirt",
    price: 499,
    image: "https://via.placeholder.com/50?text=T-shirt",
    quantity: 1,
  },
  {
    id: 2,
    name: "Shoes",
    price: 1299,
    image: "https://via.placeholder.com/50?text=Shoes",
    quantity: 2,
  },
];

export default function Cart() {
  const [cart, setCart] = useState(initialCart);

  const handleRemove = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, delta) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + delta),
            }
          : item
      )
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Box sx={{ mx: "auto", mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Cart
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {cart.length === 0 ? (
          <Typography>Your cart is empty.</Typography>
        ) : (
          <List>
            {cart.map((item) => (
              <ListItem key={item.id} sx={{ alignItems: "flex-start" }}>
                <ListItemAvatar>
                  <Avatar src={item.image} alt={item.name} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={`Price: ₹${item.price} | Quantity: ${item.quantity}`}
                />
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Button
                    size="small"
                    onClick={() => handleQuantityChange(item.id, -1)}
                  >
                    -
                  </Button>
                  <Typography>{item.quantity}</Typography>
                  <Button
                    size="small"
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    +
                  </Button>
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => handleRemove(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        )}
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">Total: ₹{total}</Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={cart.length === 0}
        >
          Checkout
        </Button>
      </Paper>
    </Box>
  );
}
