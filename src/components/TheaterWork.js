import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";

export default function PrivateTheater() {
  return (
    <Box
      sx={{
        bgcolor: "#f2f2f2", // light grey background
        py: 8, // padding top & bottom
      }}
    >
      <Container maxWidth="md">
        {/* Heading */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#58145e",
          }}
        >
          How does Private Theater Celebration work?
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Private Theatre celebration is a very new concept pioneered by The
          Binge Town. Guests can book private theaters for celebrating
          birthdays, anniversaries, date night, bride to be, etc and enjoy
          watching their favorite movies, shows, photos and videos on the big
          screen. Guests can also enjoy delicious food and beverages, and add
          other services like Cakes, Gifts, Photoshoot, etc. The Binge Town
          private theaters make celebrations easy, affordable, fun and
          memorable.
        </Typography>

        {/* Button */}
        <Box textAlign="center">
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
      </Container>
    </Box>
  );
}
