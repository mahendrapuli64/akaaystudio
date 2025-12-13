// src/Footer.js
import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Link,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import "./Footer.css";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(135deg, #1a0033 10%, #bb34a3 100%)",
        color: "#fff",
        paddingY: 6,
        paddingX: 2,
        mt: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo / About */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 2 }}>
              <img
                src="/akkaya_studio.png"
                alt="Akaay Mini Theater"
                style={{
                  width: "150px",
                  height: "auto",
                  borderRadius: "12px",
                  backgroundColor: "rgba(255,255,255,0.15)",
                  padding: "8px",
                }}
              />
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Private mini theater experience for your celebrations and movie
              nights.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#fff", mb: 2 }}
            >
              Quick Links
            </Typography>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { name: "Home", url: "/" },
                { name: "About", url: "/about" },
                { name: "Packages", url: "/packages" },
                { name: "Gallery", url: "/gallery" },
                { name: "Contact", url: "/contact" },
              ].map((link) => (
                <li key={link.name} style={{ marginBottom: "8px" }}>
                  <a
                    href={link.url}
                    style={{
                      color: "#fff",
                      textDecoration: "none",
                      transition: "color 0.3s",
                    }}
                    onMouseOver={(e) => (e.target.style.color = "#ffd700")}
                    onMouseOut={(e) => (e.target.style.color = "#fff")}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </Grid>

          {/* Contact Info + Social */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#fff", mb: 2 }}
            >
              Contact
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <LocationOnIcon sx={{ mr: 1, color: "#ffd700" }} />
              <Typography variant="body2">
                Gala no. 5 Behind Wellness Hospital, Temghar Pipeline, Bhiwandi
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <PhoneIcon sx={{ mr: 1, color: "#ffd700" }} />
              <Typography variant="body2">+91 9764535650</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <EmailIcon sx={{ mr: 1, color: "#ffd700" }} />
              <Typography variant="body2">akaaystudio888@gmail.com</Typography>
            </Box>

            {/* Follow Us */}
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", mb: 1, color: "#fff" }}
            >
              Follow Us
            </Typography>
            <Box>
              <IconButton
                aria-label="facebook"
                href="https://www.facebook.com/akaaystudio"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#fff", "&:hover": { color: "#ffd700" } }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                aria-label="instagram"
                href="https://www.instagram.com/akaaystudio"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#fff", "&:hover": { color: "#ffd700" } }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                aria-label="youtube"
                href="https://www.youtube.com/@akaaystudio"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#fff", "&:hover": { color: "#ffd700" } }}
              >
                <YouTubeIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom line */}
        <Box
          sx={{
            textAlign: "center",
            mt: 4,
            pt: 2,
            borderTop: "1px solid rgba(255,255,255,0.3)",
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()}&nbsp;
            <Link
              href="/refund-policy"
              underline="hover"
              sx={{ color: "#fff", "&:hover": { color: "#ffd700" } }}
            >
              Refund Policy
            </Link>
            &nbsp;|&nbsp;
            <Link
              href="/terms"
              underline="hover"
              sx={{ color: "#fff", "&:hover": { color: "#ffd700" } }}
            >
              Terms and Conditions
            </Link>
            &nbsp;|&nbsp;
            <Link
              href="/privacy"
              underline="hover"
              sx={{ color: "#fff", "&:hover": { color: "#ffd700" } }}
            >
              Privacy Policy
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
