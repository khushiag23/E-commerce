import { useState, useEffect } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { ProductCard } from "./components/Card";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/home";
import SignUp from "./pages/signup";
import LogIn from "./pages/login";
import Products from "./pages/Products";
import ProductDetails from "./pages/productDetails";
import Layout from "./components/Layout";
import Cart from "./pages/cart";
import { ROUTES } from "./utils/constant";
import { ThemeProvider, createTheme } from "@mui/material/styles"; // Add these imports

const theme = createTheme({
  palette: {
    primary: {
      main: "#F7CDE1",
    },
  },
});

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    const pathName = window.location.pathname;
    if (pathName === ROUTES.SIGNUP || pathName === ROUTES.LOGIN) {
      if (token) {
        window.location.href = ROUTES.HOME;
      }
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.SIGNUP} element={<SignUp />} />
          <Route path={ROUTES.LOGIN} element={<LogIn />} />
          <Route element={<Layout />}>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.PRODUCTS} element={<Products />} />
            <Route path={ROUTES.PRODUCT_DETAILS} element={<ProductDetails />} />
            <Route path={ROUTES.CART} element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <div style={{padding:"20px"}}>
      <ProductCard/></div> */}
    </ThemeProvider>
  );
}

export default App;
