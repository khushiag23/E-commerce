import React from "react";
import { ProductCard } from "../../components/Card";
import { useProductsHook } from "../../hooks/productsHook";
import { Box } from "@mui/material";

export default function Home() {
  const { products } = useProductsHook();

  return (
    <Box display={"flex"} flexWrap={"wrap"} gap={3} justifyContent={"center"} padding={3}>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </Box>
  );
}
