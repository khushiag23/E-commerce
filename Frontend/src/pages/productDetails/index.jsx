import { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
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
import { productService } from "../../service/productService";

export default function ProductDetails() {
  // Assuming product data is passed via location.state from the product list page

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchProductDetails = async () => {
      const ProductDetails = await productService.getProductById(id);
      setProduct(ProductDetails);
      setLoading(false);
    };
    fetchProductDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={3}>
          <CardMedia
            component="img"
            image={product.image}
            alt={product.name}
            sx={{
              width: { xs: "100%", md: 300 },
              height: 200,
              objectFit: "cover",
            }}
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
