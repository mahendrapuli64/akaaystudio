// src/pages/ContactPage.jsx
import React from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Celebration from "./Celebration";

const ContactPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden", // Prevent horizontal scroll
      }}
    >
      <NavBar />
      <Celebration title="Contact Us" />
      <Box
        sx={{
          flexGrow: 1,
          px: { xs: 2, md: 6 },
          py: { xs: 3, md: 6 },
          backgroundColor: "#f9f9f9",
          maxWidth: "100%", // Prevent exceeding viewport
          boxSizing: "border-box",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#58145e",
            textAlign: "center",
            mb: { xs: 4, md: 6 },
          }}
        >
          Contact Us
        </Typography>

        <Grid
          container
          spacing={{ xs: 4, md: 6 }}
          justifyContent="center"
          alignItems="flex-start"
          sx={{ maxWidth: "100%" }} // Prevent exceeding viewport
        >
          {/* Contact Form */}
          <Grid item xs={12} md={6} sx={{ maxWidth: "100%" }}>
            <Paper elevation={6} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3 }}>
              <Stack spacing={3}>
                {["Name", "Email", "Phone", "Message"].map((field, idx) => (
                  <TextField
                    key={idx}
                    label={field}
                    type={
                      field === "Email"
                        ? "email"
                        : field === "Phone"
                        ? "tel"
                        : "text"
                    }
                    variant="outlined"
                    fullWidth
                    multiline={field === "Message"}
                    rows={field === "Message" ? 5 : 1}
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: "#bb34a3" },
                        "&.Mui-focused fieldset": { borderColor: "#5a24b3" },
                      },
                    }}
                  />
                ))}
                <Button
                  variant="contained"
                  sx={{
                    background: "linear-gradient(135deg, #bb34a3, #5a24b3)",
                    color: "#fff",
                    fontWeight: "bold",
                    "&:hover": {
                      background: "linear-gradient(135deg, #d147c9, #7a2fd4)",
                    },
                  }}
                >
                  Submit
                </Button>
              </Stack>
            </Paper>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4} sx={{ maxWidth: "100%" }}>
            <Paper
              elevation={6}
              sx={{
                p: { xs: 3, md: 5 },
                backgroundColor: "#fff",
                borderRadius: 3,
                height: "100%",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#58145e", mb: 3 }}
              >
                Get in Touch
              </Typography>
              <Stack spacing={3}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <LocationOnIcon sx={{ color: "#bb34a3" }} />
                  <Typography>
                    Gala no. 5 Behind Wellness Hospital, Temghar Pipeline,
                    Bhiwandi
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <EmailIcon sx={{ color: "#bb34a3" }} />
                  <Typography>akaaystudio888@gmail.com</Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <PhoneIcon sx={{ color: "#bb34a3" }} />
                  <Typography>+91 9764535650</Typography>
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};

export default ContactPage;
