import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { apiCall } from "../../utils/apiCall";
import { ENDPOINTS } from "../../utils/endpoint";
import { HTTP_METHODS, ROUTES } from "../../utils/constant";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const validate = () => {
    let temp = { email: "", password: "" };
    temp.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
      ? ""
      : "Enter a valid email";
    temp.password =
      values.password.length >= 6
        ? ""
        : "Password must be at least 6 characters";
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validate()) {
      // Submit logic here
      const res = await apiCall(ENDPOINTS.LOGIN,HTTP_METHODS.POST,values)
      if(res.status===200){
        setValues({email:"",password:""});
        setErrors({email:"",password:""});
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("user",JSON.stringify(res.data.user));
        navigate(ROUTES.HOME);
      }
      else{
        alert(res.data.message);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
