import React from "react";
import { useEffect ,useState } from "react";
import { productService } from "../service/productService";


export function useProductsHook() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const products = await productService.getAllProducts();
      setProducts(products);
    }
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const categories = await productService.getCategories();
    setCategories([ "All", ...categories])
  }

  return { products, categories };
}
