import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined } from "@mui/icons-material";
import { postDataApi } from "../Services/ApiServices"; // Your existing API service
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in both email and password.");
      return;
    }

    setLoading(true);
    try {
      const body = { email, password };
      const response = await postDataApi("admin-login", body); // API endpoint

      if (response.statusCode === 200) {
        alert("Login successful!");
        localStorage.setItem("adminToken", "ASP"); // Store JWT if needed
        navigate("/admin/dashboard");
      } else {
        alert(response.statusMessage || "Invalid credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1e88e5, #42a5f5)",
        p: 2,
      }}
    >
      <Card
        sx={{
          width: 380,
          p: 3,
          borderRadius: 3,
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          backgroundColor: "#fff",
        }}
      >
        <CardContent>
          <Box textAlign="center" mb={3}>
            <LockOutlined sx={{ fontSize: 48, color: "#1e88e5", mb: 1 }} />
            <Typography variant="h5" fontWeight="bold">
              Admin Login
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please enter your credentials
            </Typography>
          </Box>

          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField
              label="Password"
              fullWidth
              margin="normal"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.3,
                fontWeight: 600,
                backgroundColor: "#1e88e5",
                "&:hover": { backgroundColor: "#1565c0" },
              }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
