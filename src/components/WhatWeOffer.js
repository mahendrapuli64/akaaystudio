import React from "react";
import { Box, Typography, Card, Avatar } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";

const services = [
  {
    title: "Event Planning",
    description:
      "Comprehensive planning services from concept to execution, ensuring every detail is perfect.",
    icon: <EventIcon />,
    gradient: "linear-gradient(135deg, #d946ef, #6366f1)",
  },
  {
    title: "Custom Décor",
    description:
      "Bespoke decorations and setups tailored to your theme, style preferences, and venue.",
    icon: <AutoAwesomeIcon />,
    gradient: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
  },
  {
    title: "Day-of Coordination",
    description:
      "Professional on-site management ensuring your event runs smoothly from start to finish.",
    icon: <PhoneInTalkIcon />,
    gradient: "linear-gradient(135deg, #3b82f6, #ec4899)",
  },
];

export default function WhatWeOffer() {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 6,
        backgroundColor: "#f9fafb",
        mt: 4,
        px: { xs: 2, md: 6 },
      }}
    >
      {/* Section Heading */}
      <Typography variant="h4" fontWeight="bold" color="#58145e" sx={{ mb: 3 }}>
        What We Offer
      </Typography>

      {/* Services Container */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          gap: 4,
          flexWrap: "wrap",
          mt: 4,
        }}
      >
        {services.map((service, index) => (
          <Card
            key={index}
            sx={{
              p: 3,
              backgroundColor: "#ffffff",
              borderRadius: 3,
              width: 300,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              textAlign: "center",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 6px 25px rgba(0,0,0,0.15)",
              },
            }}
          >
            <Avatar
              sx={{
                mx: "auto",
                mb: 2,
                background: service.gradient,
                width: 70,
                height: 70,
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              }}
            >
              {React.cloneElement(service.icon, {
                sx: { color: "#fff", fontSize: 36 },
              })}
            </Avatar>

            <Typography
              variant="h6"
              fontWeight="bold"
              color="#58145e"
              gutterBottom
            >
              {service.title}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {service.description}
            </Typography>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
