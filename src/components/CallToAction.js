import React from "react";
import { Box, Typography, Button } from "@mui/material";

const CallToAction = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #fce7f3, #fdf2f8)", // subtle pink background
        textAlign: "center",
        py: { xs: 6, md: 10 },
        px: { xs: 3, md: 8 },
        mt: 6,
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ color: "#58145e" }}
      >
        Ready to Plan Your Next Event?
      </Typography>

      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ maxWidth: 600, mx: "auto", mb: 4 }}
      >
        Let us help you create a memorable experience tailored to your specific
        needs and preferences.
      </Typography>

      <Button
        variant="contained"
        size="large"
        sx={{
          mt: 4,
          px: 5,
          py: 1.5,
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
        Contact Us Today
      </Button>
    </Box>
  );
};

export default CallToAction;
