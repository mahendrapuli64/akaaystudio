// src/pages/BookingOccasion.jsx
import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  TextField,
  Button,
} from "@mui/material";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { getDetailsAPI, postDataApi } from "../Services/ApiServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function OccasionCard({ title, img, selected, onSelect }) {
  return (
    <Card
      sx={{
        maxWidth: 300,
        borderRadius: 3,
        border: selected ? "3px solid #1976d2" : "1px solid #ccc",
        cursor: "pointer",
        transition: "transform 0.2s, border 0.2s",
        "&:hover": {
          transform: "scale(1.05)",
          borderColor: "#1976d2",
        },
      }}
      onClick={onSelect}
    >
      <CardMedia
        component="img"
        height="160"
        image={img}
        alt={title}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography
          variant="h6"
          component="div"
          textAlign="center"
          sx={{
            fontWeight: selected ? "bold" : "normal",
            color: selected ? "#5a24b3" : "inherit",
          }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}

function BookingOccasion() {
  const [occasions, setOccasions] = useState([]);
  const [selectedOccasion, setSelectedOccasion] = useState(null);
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOccasions = async () => {
      try {
        const response = await getDetailsAPI("get-occasion");
        if (response.statusCode === 200) {
          setOccasions(response.occasions || []);
        } else {
          console.error("API returned error:", response);
          toast.error("API returned error:");
        }
      } catch (error) {
        console.error("Error fetching occasions:", error);
        toast.error("Error fetching occasions:");
      }
    };

    fetchOccasions();
  }, []);

  const handleNext = async () => {
    if (!selectedOccasion) return toast.info("Please select an occasion!");
    if (!nickname.trim()) return toast.info("Please enter your nickname!");

    try {
      const requestBody = {
        id: sessionStorage.getItem("bookingId"),
        nickName: nickname,
        occasionName: selectedOccasion,
      };

      const response = await postDataApi("save-occasion", requestBody);

      if (response.statusCode === 200) {
        toast.success("Occasion and nickname saved successfully!", {
          autoClose: 2000, // duration in ms
          onClose: () => {
            navigate("/decoration");
          },
        });
      } else {
        console.error("API returned error:", response);
        toast.error("Failed to save occasion. Please try again.");
      }
    } catch (error) {
      console.error("Error saving occasion:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <NavBar />
      <Box sx={{ flexGrow: 1, px: { xs: 2, md: 6 }, py: { xs: 4, md: 6 } }}>
        <Typography
          variant="h4"
          gutterBottom
          textAlign="center"
          sx={{ fontWeight: "bold", mb: 4 }}
        >
          Select the Occasion
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {occasions.length > 0 ? (
            occasions.map((occasion, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <OccasionCard
                  title={occasion.title}
                  img={
                    occasion.image
                      ? `data:image/jpeg;base64,${occasion.image}`
                      : "/placeholder.png"
                  }
                  selected={selectedOccasion === occasion.title}
                  onSelect={() => setSelectedOccasion(occasion.title)}
                />
              </Grid>
            ))
          ) : (
            <Typography
              variant="h6"
              sx={{ mt: 4, width: "100%", textAlign: "center" }}
            >
              Loading occasions...
            </Typography>
          )}
        </Grid>

        {selectedOccasion && (
          <Typography
            variant="h6"
            textAlign="center"
            sx={{ mt: 3, color: "#5a24b3", fontWeight: "bold" }}
          >
            Selected Occasion: {selectedOccasion}
          </Typography>
        )}

        <TextField
          label="Enter your nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          fullWidth
          sx={{ mt: 3 }}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            marginTop: 2,
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
          onClick={handleNext}
        >
          Next Step
        </Button>
      </Box>
      <Footer />
    </>
  );
}

export default BookingOccasion;
