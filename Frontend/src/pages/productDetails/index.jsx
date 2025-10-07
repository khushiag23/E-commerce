import React from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Paper,
  Container,
} from "@mui/material";

export default function ProductDetails() {
  // Assuming product data is passed via location.state from the product list page
  const location = useLocation();
  const product = location.state?.product || {
    name: "Sample Product",
    description: "This is a sample product description.",
    price: 99.99,
    image:
      "https://via.placeholder.com/300x200.png?text=Product+Image",
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={3}>
          <CardMedia
            component="img"
            image={product.image}
            alt={product.name}
            sx={{ width: { xs: "100%", md: 300 }, height: 200, objectFit: "cover" }}
          />
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {product.description}
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              ₹{product.price}
            </Typography>
            <Button variant="contained" color="primary">
              Add to Cart
            </Button>
          </CardContent>
        </Box>
      </Paper>
    </Box>
  );
}
