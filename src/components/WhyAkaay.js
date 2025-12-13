import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Fade,
} from "@mui/material";

const serviceImages = [
  "/service-bouquet-and-other-gifts.jpg",
  "/atmospheric-fog-entrances.jpg",
  "/service-photoshoot.jpg",
  "/service-private-movie-screening.jpg",
  "/service-snacks-and-beverage.jpg",
];

const serviceContent = [
  {
    title: "Unique & Memorable Experiences",
    description:
      "We specialize in creating unforgettable celebrations tailored to your needs.",
  },
  {
    title: "Stunning Decorations",
    description:
      "From elegant balloon setups to themed décor, we bring your vision to life.",
  },
  {
    title: "Premium Quality & Attention to Detail",
    description:
      "Every event is crafted with precision and top-quality materials.",
  },
  {
    title: "Trusted by Thousands",
    description:
      "Our happy customers love our seamless service and creative designs.",
  },
  {
    title: "Hassle-Free Booking",
    description:
      "Easy and quick reservations for birthdays, anniversaries, proposals, and more!",
  },
];

export default function WhyAkaay() {
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % serviceImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        p: 4,
        backgroundColor: "#fff",
        marginTop: 3,
        textAlign: "center",
      }}
    >
      {/* LEFT: Text content */}
      <Box
        sx={{
          flex: 1,
          maxWidth: 600,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: "#58145e",
            mb: 3,
          }}
        >
          Why Choose The Akaay Mini Theater?
        </Typography>

        <List sx={{ textAlign: "left", mb: 3 }}>
          {serviceContent.map((item, index) => (
            <ListItem
              key={index}
              sx={{ display: "block", mb: 1 }}
              disablePadding
            >
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: "bold", color: "#000" }}>
                    {item.title}
                  </Typography>
                }
                secondary={
                  <Typography sx={{ color: "#000" }}>
                    {item.description}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>

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

      {/* RIGHT: Image carousel */}
      <Card
        sx={{
          flexShrink: 0,
          width: { xs: "90%", md: 400 },
          height: { xs: 300, md: 500 },
          borderRadius: 4,
          boxShadow: 4,
          overflow: "hidden",
          mx: "auto",
          position: "relative",
        }}
      >
        {serviceImages.map((img, index) => (
          <Fade in={current === index} key={index} timeout={1000} unmountOnExit>
            <CardMedia
              component="img"
              src={img}
              alt={serviceContent[index].title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          </Fade>
        ))}
      </Card>
    </Box>
  );
}
