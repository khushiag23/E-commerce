import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/constant';

export function ProductCard() {

  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(ROUTES.PRODUCT_DETAILS)} sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="340"
          image="https://m.media-amazon.com/images/I/51f8xHJdeXL._AC_UL480_FMwebp_QL65_.jpg"
          alt="green iguana"
          style={{objectFit:"contain"}}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
           <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            $2500
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{display:"flex", alignItems:"center",justifyContent:"center"}}>
        <Button size="small" color="primary">
          <ShoppingCartOutlinedIcon fontSize='medium'/>Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
