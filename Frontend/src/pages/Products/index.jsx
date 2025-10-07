import React, { useState } from "react";
import { Box, Grid, TextField, Select, MenuItem, InputLabel, FormControl, Typography } from "@mui/material";
import { ProductCard } from "../../components/Card";

// Sample product data
const productsData = [
  { id: 1, name: "T-shirt", category: "Clothing", price: 499, image: "https://via.placeholder.com/150?text=T-shirt" },
  { id: 2, name: "Shoes", category: "Footwear", price: 1299, image: "https://via.placeholder.com/150?text=Shoes" },
  { id: 3, name: "Watch", category: "Accessories", price: 1999, image: "https://via.placeholder.com/150?text=Watch" },
  { id: 4, name: "Jeans", category: "Clothing", price: 899, image: "https://via.placeholder.com/150?text=Jeans" },
];

const categories = ["All", "Clothing", "Footwear", "Accessories"];

export default function Products() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("All");

  // Filter products by category
  let filteredProducts = filter === "All"
    ? productsData
    : productsData.filter(p => p.category === filter);

  // Search products by name
  filteredProducts = filteredProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sort products by price
  if (sort === "lowToHigh") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sort === "highToLow") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Shop</Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={filter}
            label="Category"
            onChange={e => setFilter(e.target.value)}
          >
            {categories.map(cat => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Sort</InputLabel>
          <Select
            value={sort}
            label="Sort"
            onChange={e => setSort(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="lowToHigh">Price: Low to High</MenuItem>
            <MenuItem value="highToLow">Price: High to Low</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={2}>
        {filteredProducts.length === 0 ? (
          <Grid item xs={12}>
            <Typography>No products found.</Typography>
          </Grid>
        ) : (
          filteredProducts.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}
