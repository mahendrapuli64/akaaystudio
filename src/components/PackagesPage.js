// PackagesPage.jsx
import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Celebration from "./Celebration";
import TheatreList from "./TheatreCard";
import { Box, Typography } from "@mui/material";
import AdminMenus from "./AdminMenus";

const PackagesPage = () => {
  const islogin = localStorage.getItem("adminToken");
  return (
    <>
      {islogin === "ASP" ? <AdminMenus /> : <NavBar />}

      <main
        style={{
          maxWidth: "100vw",
          overflowX: "hidden",
          background: "linear-gradient(135deg, #fce7f3, #fff0f9)", // soft pink gradient
          minHeight: "100vh",
        }}
      >
        {/* Hero / Page Title */}
        <Celebration title="Our Packages" />

        {/* Intro Section */}
        <Box
          sx={{
            textAlign: "center",
            py: { xs: 4, md: 8 },
            px: { xs: 2, md: 6 },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "#58145e",
              mb: 2,
            }}
          >
            Our Decore Will Be Changes In Every 15 to 20 Days
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: 800,
              mx: "auto",
              color: "#4b3268",
              fontWeight: 500,
              lineHeight: 1.6,
            }}
          >
            At Akaay Studio, we offer a variety of tailored packages for your
            special events. Whether it’s a private movie night, a birthday
            celebration, or a corporate gathering, we have the perfect package
            to create unforgettable memories.
          </Typography>
        </Box>

        {/* Theatre / Packages List */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 4,
            px: { xs: 2, md: 6 },
            pb: { xs: 6, md: 10 },
          }}
        >
          <TheatreList />
        </Box>
      </main>

      <Footer />
    </>
  );
};

export default PackagesPage;
