// src/components/AkaayaServices.jsx
import React from "react";
import { Box, Grid, Typography, Card, CardMedia } from "@mui/material";
import { motion } from "framer-motion";

const content = [
  {
    title: "Private movie screening",
    text: `You can book our private theaters for watching your favorite movies and shows
on the big HD screen with surround sound and comfortable sittings. Our screen
sizes vary from 135 inch to 180 inch and speakers vary from 600 W to 1000 W.
Customers have to use their own OTT accounts or downloaded files to stream the
content. We support all major OTT Apps and help in setting things up for you.
Please note that we do not support Pen Drives/Hard Disks.`,
    img: "/privatemovies.jpeg",
    reverse: false,
  },
  {
    title: "Decoration",
    text: `All our Private theaters are decorated to make them a great place for
celebrations of special events like Birthdays, anniversaries, bride to be,
romantic date, etc. Each and every private theater of The Binge Town has a
different and unique theme of decoration. In some theatres decorations is
mandatory and included in pricing while in others we provide without decoration
pricing options also. Decorations are as per reference images with slight
customizations specific to the event.`,
    img: "/decoration.jpeg",
    reverse: true,
  },
  {
    title: "Snacks and beverages",
    text: `Enjoy a wide variety of snacks and beverages while watching your favorite shows.
We provide comfortable food setups and ensure everything is hygienic and fresh.`,
    img: "/service-snacks-and-beverage.jpg",
    reverse: false,
  },
  {
    title: "Cakes",
    text: `Custom cakes available for birthdays, anniversaries, and other celebrations.
Choose from a variety of flavors and designs to make your event memorable.`,
    img: "/Cake.jpg",
    reverse: true,
  },
  {
    title: "Bouquet and other gifts",
    text: `We provide beautiful bouquets and gifts to make your event extra special.
Choose from pre-designed packages or customize as per your need.`,
    img: "/service-bouquet-and-other-gifts.jpg",
    reverse: false,
  },
  {
    title: "Fog entry",
    text: `Add a magical touch to your celebration with our fog entry effects.
Perfect for birthdays, anniversaries, and special events.`,
    img: "/fogEntry.png",
    reverse: true,
  },
  {
    title: "Photoshoot",
    text: `Capture memories with our professional photoshoot setup.
Perfect for birthdays, couple shoots, and celebrations.`,
    img: "/Photoshoot.jpg",
    reverse: false,
  },
];

const AkaayaServices = () => {
  // Variants for animation
  const textVariants = {
    hidden: (reverse) => ({ opacity: 0, x: reverse ? 100 : -100 }),
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    hover: { scale: 1.05 },
  };

  return (
    <Box
      sx={{
        px: { xs: 2, md: 8 },
        py: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {content.map((section, i) => (
        <Grid
          container
          key={i}
          spacing={4}
          alignItems="center"
          justifyContent="center"
          direction={section.reverse ? "row-reverse" : "row"}
          sx={{
            mb: 10,
            maxWidth: 1200,
            width: "100%",
          }}
        >
          {/* Text */}
          <Grid item xs={12} md={6}>
            <motion.div
              custom={section.reverse}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={textVariants}
            >
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {section.title}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ whiteSpace: "pre-line" }}
              >
                {section.text}
              </Typography>
            </motion.div>
          </Grid>

          {/* Image */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.2 }}
              variants={imageVariants}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 4,
                  overflow: "hidden",
                  height: { xs: 250, md: 270 },
                  width: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  image={section.img}
                  alt={section.title}
                  sx={{ height: "100%", objectFit: "cover" }}
                />
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default AkaayaServices;
