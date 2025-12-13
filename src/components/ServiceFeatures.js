// src/components/ServicesSection.jsx
import React from "react";
import { Box, Grid, Typography, Avatar } from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import TvIcon from "@mui/icons-material/Tv";
import CakeIcon from "@mui/icons-material/Cake";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import EmojiNatureIcon from "@mui/icons-material/EmojiNature";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ChildCareIcon from "@mui/icons-material/ChildCare";

const services = [
  {
    icon: <FastfoodIcon fontSize="large" />,
    title: "Food & Beverages",
    description:
      "Enjoy delicious in-theatre dining options at affordable prices!",
  },
  {
    icon: <TvIcon fontSize="large" />,
    title: "Screening",
    description: "Watch your favorite movies & shows on big screen!",
  },
  {
    icon: <CakeIcon fontSize="large" />,
    title: "Cakes",
    description:
      "Discover your ideal celebration cake from our diverse selection.",
  },
  {
    icon: <LocalFloristIcon fontSize="large" />,
    title: "Bouquets",
    description:
      "Elevate your celebration with a stunning rose bouquet addition.",
  },
  {
    icon: <EmojiNatureIcon fontSize="large" />,
    title: "Decoration",
    description:
      "Transform your celebrations with beautiful personalized decor and themed setups.",
  },
  {
    icon: <PhotoCameraIcon fontSize="large" />,
    title: "Photoshoot",
    description:
      "Capture unforgettable memories with our exclusive in-theatre photoshoot experience.",
  },
  {
    icon: <AcUnitIcon fontSize="large" />,
    title: "Fog Entry",
    description:
      "Create a magical ambience with a dramatic fog-filled entrance for your event.",
  },
  {
    icon: <ChildCareIcon fontSize="large" />,
    title: "Kids Celebration",
    description:
      "Host an unforgettable kids’ party with fun themes, games, and special treats.",
  },
];

export default function ServiceFeatures() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#58145e",
          color: "white",
          p: { xs: 4, md: 6 },
          m: { xs: 2, md: 4 },
          borderRadius: 3,
          maxWidth: "1200px",
          width: "100%",
          boxShadow: 4,
        }}
      >
        <Grid container spacing={4}>
          {services.map((service, index) => {
            const isRight = index % 2 === 1; // every second item goes in the right column
            return (
              <Grid
                item
                xs={12}
                md={6}
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: isRight ? "flex-end" : "flex-start",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: isRight ? "row" : "row", // icon then text in both
                    alignItems: "flex-start",
                    textAlign: isRight ? "left" : "left", // keep text left of its box
                    maxWidth: 500,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "white",
                      color: "#880E4F",
                      width: 60,
                      height: 60,
                      mr: 2,
                      flexShrink: 0,
                    }}
                  >
                    {service.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {service.title}
                    </Typography>
                    <Typography variant="body1">
                      {service.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}
