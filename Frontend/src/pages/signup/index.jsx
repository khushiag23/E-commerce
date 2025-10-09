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

export default function SignUp() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const validate = () => {
    let temp = { username: "", email: "", password: "" };
    temp.username = values.username ? "" : "Username is required";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      // Submit logic here
      const res = await apiCall(ENDPOINTS.REGISTER, HTTP_METHODS.POST, {
        name: values.username,
        email: values.email,
        password: values.password,
      });
      if (res.status === 201) {
        alert("User registered successfully");
        setValues({ username: "", email: "", password: "" });
        setErrors({ username: "", email: "", password: "" });
        navigate(ROUTES.LOGIN);
      } else {
        console.log(res);
        alert(res?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Username"
            name="username"
            value={values.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.username}
            helperText={errors.username}
            required
          />
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
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
