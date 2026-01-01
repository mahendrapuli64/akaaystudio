import React, { useState, useEffect } from "react";
import { Box, Button, Card, CardMedia } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "./HeroBanner.css";
import { getDetailsAPI } from "../Services/ApiServices";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../components/LoaderContext";
import { toast } from "react-toastify";

export default function HeroBanner() {
  const [images, setImages] = useState([]); // dynamic base64 images
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const { showLoader, hideLoader } = useLoader();
  const navigate = useNavigate();

  // Fetch home images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        showLoader();
        const response = await getDetailsAPI("homeimages");

        if (response?.statusCode === 200 && Array.isArray(response.homeCard)) {
          const imageUrls = response.homeCard.map(
            (item) => `data:image/jpeg;base64,${item.image}`
          );
          setImages(imageUrls);
        } else {
          console.error("Unexpected API response:", response);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        toast.error("Server error from frontend!");
      } finally {
        hideLoader();
      }
    };

    fetchImages();
  }, []); // 👈 runs ONLY once

  // Rotate images every 9 seconds
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [images]);

  const handleBook = () => {
    if (!selectedDate) return alert("Please select a date!");
    // Convert Dayjs object to string if needed
    const formattedDate = dayjs(selectedDate).format("DD/MM/YYYY");
    navigate("/packages", { state: { date: formattedDate } });
  };

  return (
    <Box
      className="hero-banner"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
      }}
    >
      <Card
        sx={{
          width: 600,
          textAlign: "center",
          padding: 2,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <Card sx={{ maxWidth: "100%", borderRadius: 4, overflow: "hidden" }}>
          {images[currentImage] && (
            <CardMedia
              sx={{ height: 250, objectFit: "cover" }}
              image={images[currentImage]}
              title="Hero Image"
            />
          )}
        </Card>

        <Box sx={{ marginTop: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              minDate={dayjs()}
              format="DD/MM/YYYY" // <-- This sets the display format
              slotProps={{
                textField: { variant: "outlined", fullWidth: true },
              }}
            />
          </LocalizationProvider>
        </Box>

        <Button
          variant="contained"
          onClick={handleBook}
          sx={{
            marginTop: 2,
            width: 300,
            borderRadius: "50px",
            paddingY: 1.2,
            textTransform: "none",
            fontSize: "1.1rem",
            fontWeight: 600,
            background: "linear-gradient(135deg, #bb34a3 0%, #5a24b3 100%)",
            color: "#fff",
            boxShadow: "0 4px 15px rgba(187, 52, 163, 0.4)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(135deg, #d147c9 0%, #7a2fd4 100%)",
              boxShadow: "0 6px 20px rgba(187, 52, 163, 0.6)",
              transform: "scale(1.05)",
            },
            "&:active": {
              transform: "scale(0.97)",
              boxShadow: "0 3px 10px rgba(187, 52, 163, 0.3)",
            },
          }}
        >
          Booking
        </Button>
      </Card>
    </Box>
  );
}
