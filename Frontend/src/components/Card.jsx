import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/constant";
import { CustomButton } from "./button";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { cartService } from "../service/cartService";


export function ProductCard({ product }) {
  const navigate = useNavigate();

  
  const handleAddToCart = async () => {
    try {
     const res = await cartService.addToCart(product._id, 1);
     console.log(res,"res");
     if(res.status === 200) {
      alert('Added to cart successfully!');
     } else {
      alert('Failed to add to cart');
     }
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert('Failed to add to cart');
    }
  };

  return (
    <Card
      sx={{ maxWidth: 320 }}
    >
      <CardActionArea
      onClick={() => navigate(ROUTES.PRODUCTS + "/" + product._id)}
      
      >
        <CardMedia
          component="img"
          height="320"
          image={ product.image}
          alt={product.name}
          style={{ objectFit: "contain" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            ${product.price}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CustomButton onClick={handleAddToCart}>
        <ShoppingCartOutlinedIcon fontSize="medium" />
        Add to Cart
      </CustomButton>
    </Card>
  );
}
