import React from "react";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Celebration from "./Celebration";
import WhatWeOffer from "./WhatWeOffer";
import StatsSection from "./StatsSection";
import CallToAction from "./CallToAction";

export default function AboutPage() {
  return (
    <>
      <NavBar />

      <main
        style={{
          overflowX: "hidden", // ✅ prevent horizontal scroll globally
          backgroundColor: "#fff",
        }}
      >
        {/* Hero / Page Title Section */}
        <Celebration title="About Us" />

        {/* Intro Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: { xs: 3, md: 6 },
            p: { xs: 2, md: 6 },
            // background: "linear-gradient(135deg, #dcdc2cff, #fff0f9)",
            background: "linear-gradient(135deg, #fce7f3, #fdf2f8)",
            mt: 3,
            maxWidth: "100%",
          }}
        >
          {/* LEFT: Text Content */}
          <Box
            sx={{
              flex: 1,
              maxWidth: 600,
              px: { xs: 1, md: 0 },
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                color: "#58145e",
                mb: 3,
                lineHeight: 1.2,
              }}
            >
              Creating Magical Moments Since 2010
            </Typography>

            <Typography
              variant="body1"
              paragraph
              sx={{ color: "black", fontWeight: 500, lineHeight: 1.6 }}
            >
              We are a premier event planning company specializing in creating
              unforgettable moments for all your special occasions.
            </Typography>

            <Typography
              variant="body1"
              paragraph
              sx={{ color: "black", fontWeight: 500, lineHeight: 1.6 }}
            >
              Our services include complete event design, coordination, custom
              décor, and personalized touches that make your celebration truly
              special.
            </Typography>

            <Typography
              variant="body1"
              paragraph
              sx={{ color: "black", fontWeight: 500, lineHeight: 1.6 }}
            >
              Since our establishment, we've set the standard for excellence.
              Our dedicated team ensures every aspect of your event exceeds
              expectations and leaves lasting memories.
            </Typography>
          </Box>

          {/* RIGHT: Static Image with Hover Overlay */}
          <Card
            sx={{
              flexShrink: 0,
              width: { xs: "100%", sm: "90%", md: 420 },
              maxWidth: "100%",
              height: { xs: 250, md: 500 },
              borderRadius: 4,
              boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
              overflow: "hidden",
              position: "relative",
              cursor: "pointer",
              "&:hover .overlay": { opacity: 1 },
              "&:hover .zoomImg": { transform: "scale(1.1)" },
            }}
          >
            <CardMedia
              component="img"
              src="hero1.jpg"
              alt="About Us"
              className="zoomImg"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.8s ease",
              }}
            />

            <Box
              className="overlay"
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
                color: "#fff",
                opacity: 0,
                transition: "opacity 0.4s ease",
                p: 3,
                textAlign: "left",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  fontFamily: "'Dancing Script', cursive",
                  mb: 1,
                }}
              >
                About Our Creative Design
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "medium",
                  fontFamily: "'Dancing Script', cursive",
                }}
              >
                We transform ordinary spaces into extraordinary experiences.
              </Typography>
            </Box>
          </Card>
        </Box>

        {/* What We Offer Section */}
        <WhatWeOffer />

        {/* Stats Section */}
        <StatsSection />

        {/* Call To Action */}
        <CallToAction />
      </main>

      <Footer />
    </>
  );
}
