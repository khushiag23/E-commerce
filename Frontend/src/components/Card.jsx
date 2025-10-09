import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/constant";
import { CustomButton } from "./button";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


export function ProductCard() {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(ROUTES.PRODUCT_DETAILS)}
      sx={{ maxWidth: 320 }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="320"
          image="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTxKSCfCfgkIMm5CSVk0i6G_YhkPAkrSAeXVdgEvU4G_Rt11FcaF10x0bfORVN2IIunHM6OI1hbbSICjqFNZViqV8XJTRKiYHFIqBW_gl8"
          alt="green iguana"
          style={{ objectFit: "contain" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            $2500
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
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
