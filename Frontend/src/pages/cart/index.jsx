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
import { useEffect } from "react";
import { cartService } from "../../service/cartService";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Cart() {
  const [cart, setCart] = useState([]);

  console.log(cart,"cart");

  useEffect(()=>{
    getCart();
  },[])

  const getCart = async () => {
    const res = await cartService.getCart();
    setCart(res.data.cart.products);
  };

  const handleRemove = async (id) => {
    setCart(cart.filter((item) => item._id !== id));
     const res = await cartService.removeItem(id);
     if(res.status === 200) {
      alert(res.data.message);
     } else {
      alert(res.data.message);
     }
  };

  const handleQuantityChange = async (id, delta) => {  
    const updatedCart = cart.map((item) =>{
      const updatedQuantity = Math.max(1, item.quantity + delta);
        return item._id === id
          ? {
              ...item,
              quantity: item.productId.stock > updatedQuantity ? updatedQuantity : item.productId.stock,
            }
          : item
      })
    setCart(updatedCart);
    const product = updatedCart.find((item) => item._id === id)
    const res = await cartService.updateCart(product.productId._id,product.quantity)
    // if(res.status === 200) {
    //   alert(res.data.message);
    //  } else {
    //   alert(res.data.message);
    //  }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
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
              <ListItem key={item._id} sx={{ alignItems: "flex-start" }}>
                <ListItemAvatar>
                  <Avatar src={item.productId.image} alt={item.productId.name} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.productId.name}
                  secondary={`Price: ₹${item.productId.price} | Quantity: ${item.quantity}`}
                />
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Button
                    onClick={() => handleQuantityChange(item._id, -1)}
                  >
                   <RemoveIcon />
                  </Button>
                  <Typography>{item.quantity}</Typography>
                  <Button
                    onClick={() => handleQuantityChange(item._id, 1)}
                  >
                    <AddIcon />
                  </Button>
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => handleRemove(item._id)}
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
