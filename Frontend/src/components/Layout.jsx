import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Container } from "@mui/material";

const Layout = () => (
  <>
    <Navbar />
    <Container>
      <Outlet /> {/* This renders the child route (e.g., Home, Shop, etc.) */}
    </Container>
  </>
);

export default Layout;
