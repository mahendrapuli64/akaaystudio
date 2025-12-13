import React, { useRef, useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import Celebration from "./Celebration";
import { Grid, Card, CardActionArea, CardMedia } from "@mui/material";
import { keyframes } from "@mui/system";

// Scroll Animation: fade in + slide up
const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const images = [
  "/celebration.jpg",
  "/decoration.jpeg",
  "/hero1.jpg",
  "/anniversary.jpg",
  "/anniversary_1.jpg",
];

export default function GalleryPage() {
  const refs = useRef([]);
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setVisible((prev) => [...new Set([...prev, index])]);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    refs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: "100vw", overflowX: "hidden" }}>
        <Celebration title="Our Gallery" />
        <Grid
          container
          spacing={3}
          sx={{
            backgroundColor: "white",
            p: { xs: 2, md: 4 },
            pt: { xs: 6, md: 10 },
            justifyContent: "center",
          }}
        >
          {images.map((src, idx) => (
            <Grid
              item
              key={idx}
              xs={12}
              sm={6}
              md={4}
              data-index={idx}
              ref={(el) => (refs.current[idx] = el)}
              sx={{
                opacity: visible.includes(idx) ? 1 : 0,
                animation: visible.includes(idx)
                  ? `${fadeInUp} 0.6s ease forwards`
                  : "none",
              }}
            >
              <Card
                sx={{
                  width: "100%",
                  height: 220,
                  borderRadius: 3,
                  overflow: "hidden",
                  position: "relative",
                  transition: "transform 0.4s, box-shadow 0.4s",
                  "&:hover": {
                    transform: "scale(1.08) rotate(1deg)",
                    boxShadow: "0 15px 25px rgba(0,0,0,0.3)",
                  },
                }}
              >
                <CardActionArea sx={{ height: "100%" }}>
                  <CardMedia
                    component="img"
                    image={src}
                    alt={`party-${idx}`}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.4s ease, filter 0.4s ease",
                      "&:hover": {
                        transform: "scale(1.12) rotate(1deg)",
                        filter: "brightness(1.1)",
                      },
                    }}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </main>
      <Footer />
    </>
  );
}
