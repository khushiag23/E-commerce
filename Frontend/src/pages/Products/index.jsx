import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import { ProductCard } from "../../components/Card";
import { useProductsHook } from "../../hooks/productsHook";
import { useNavigate } from "react-router-dom";
import { productService } from "../../service/productService";

export default function Products() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("All");
  const [products, setProducts] = useState([]);

  const { categories } = useProductsHook();
  const navigate = useNavigate();

  let filteredProducts =
    filter === "All" ? products : products.filter((p) => p.category === filter);

  filteredProducts = filteredProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (window.location.search) {
      const params = new URLSearchParams(window.location.search);
      const category = params.get("category") || "All";
      const sort = params.get("sort") || "";
      const search = params.get("search") || "";
      setFilter(category);
      setSort(sort);
      setSearch(search);
    }
    fetchFilteredProducts();
  }, [search, filter, sort]);

  const fetchFilteredProducts = async () => {
    let query = [];
    if (search) query.push(`search=${search}`);
    if (filter && filter !== "All") query.push(`category=${filter}`);
    if (sort) query.push(`sort=${sort==="lowToHigh"?"asc":"desc"}`);
    const queryString = query.join("&");
    const products = await productService.getFilteredProducts(queryString)
    console.log(products , "filtered products");
    setProducts(products);

  };

  const handleSearch = (e) => {
    const value = e.target.value.trim();
    setSearch(value);
    setParams("search", value);
  };

  const setParams = (key, value) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    navigate(`?${params.toString()}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Shop
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={handleSearch}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={filter}
            label="Category"
            onChange={(e) => {
              setFilter(e.target.value);
              setParams("category", e.target.value);
            }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Sort</InputLabel>
          <Select
            value={sort}
            label="Sort"
            onChange={(e) => {
              setSort(e.target.value);
              setParams("sort", e.target.value);
            }}
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
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}
