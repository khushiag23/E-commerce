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


export function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(ROUTES.PRODUCTS + "/" + product._id)}
      sx={{ maxWidth: 320 }}
    >
      <CardActionArea>
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
      <CustomButton>
        <ShoppingCartOutlinedIcon fontSize="medium" />
        Add to Cart
      </CustomButton>
    </Card>
  );
}
