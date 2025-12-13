import React from "react";
import { Box, Typography, Button } from "@mui/material";

export default function About() {
  return (
    <Box
      sx={{
        textAlign: "center",
        paddingX: 2,
        paddingY: 8,
        background: "linear-gradient(135deg, #f8f5ff 0%, #fff 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle decorative gradient overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at top left, rgba(187, 52, 163, 0.1), transparent 60%)",
          zIndex: 0,
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1 }}>
        {/* Heading */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: "#58145e",
            marginBottom: 2,
            textShadow: "2px 2px 8px rgba(187, 52, 163, 0.2)",
          }}
        >
          Welcome to Akaay Studio
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            fontFamily: "'Roboto', sans-serif",
            color: "#333",
            lineHeight: 1.8,
            maxWidth: 800,
            fontWeight: 500,
            margin: "0 auto",
            fontSize: "1.1rem",
          }}
        >
          Celebrate life's special moments with a unique and unforgettable
          private theatre experience! Whether it’s a Birthday Party 🎂, a
          Romantic Anniversary 💍, or a Fun-Filled Event 🎉, we offer a cozy and
          exclusive setting tailored just for you. Enjoy personalized movie
          screenings, create lasting memories, and turn your occasions into
          extraordinary cinematic experiences.
        </Typography>

        {/* Read More Button */}
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
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          Read More
        </Button>
      </Box>
    </Box>
  );
}
