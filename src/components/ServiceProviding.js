import React from "react";
import Slider from "react-slick";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Button,
} from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./sliderOverrides.css"; // custom arrow styles

const services = [
  { title: "Photoshoot", img: "/Photoshoot.jpg", bestSeller: true },
  { title: "Gifts", img: "Gift.jpg" },
  { title: "Cake", img: "Cake.jpg" },
  { title: "Fog Entry", img: "FogEntry.png" },
];

export default function Services() {
  const settings = {
    dots: false,
    infinite: true,
    centerMode: true,
    centerPadding: "40px",
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 900, settings: { slidesToShow: 2, centerPadding: "30px" } },
      { breakpoint: 600, settings: { slidesToShow: 1, centerPadding: "20px" } },
    ],
  };

  return (
    <Box sx={{ p: 4, background: "#f5f5f5" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#58145e",
          textAlign: "center", // center heading too
        }}
      >
        Our Services
      </Typography>

      <Slider {...settings}>
        {services.map((service, index) => (
          <Box key={index} sx={{ px: 1.5 }}>
            <Card
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                height: 280,
                display: "flex",
                flexDirection: "column",
                mx: 1.5,
                boxShadow: 3,
              }}
            >
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={service.img}
                  alt={service.title}
                />
                {service.bestSeller && (
                  <Chip
                    label="Best-seller"
                    color="error"
                    size="small"
                    sx={{ position: "absolute", top: 10, left: 10 }}
                  />
                )}
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" textAlign="center">
                  {service.title}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>

      {/* Centered Button */}
      <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          sx={{
            marginTop: 5,
            width: 200,
            paddingY: 1.3,
            borderRadius: "50px",
            fontWeight: 600,
            fontSize: "1rem",
            textTransform: "none",
            background: "linear-gradient(135deg, #bb34a3, #5a24b3)",
            color: "#fff",
            boxShadow: "0 4px 15px rgba(187, 52, 163, 0.4)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(135deg, #d147c9, #7a2fd4)",
              boxShadow: "0 6px 20px rgba(187, 52, 163, 0.6)",
              transform: "scale(1.05)",
            },
            "&:active": {
              transform: "scale(0.97)",
              boxShadow: "0 3px 10px rgba(187, 52, 163, 0.3)",
            },
          }}
        >
          Book Now
        </Button>
      </Box>
    </Box>
  );
}
