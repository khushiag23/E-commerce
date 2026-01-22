import React from "react";
import Button from "@mui/material/Button";

export function CustomButton({ children, onClick }) {
  return (
    <Button
      size="small"
      color="primary"
      backgroundColor="#F7CDE1"
      variant="contained"
      onClick={onClick}
      fullWidth
    >
      {children}
    </Button>
  );
}
