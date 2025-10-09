import React from "react";
import Button from "@mui/material/Button";

export function CustomButton({ children }) {
  return (
    <Button
      size="small"
      color="primary"
      backgroundColor="#F7CDE1"
      variant="contained"
      fullWidth
    >
      {children}
    </Button>
  );
}
