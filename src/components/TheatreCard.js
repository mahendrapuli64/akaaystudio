// src/components/TheatreList.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Chip,
  Stack,
  Tooltip,
  Avatar,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate, useLocation } from "react-router-dom";
import { postDataApi } from "../Services/ApiServices";
import { toast } from "react-toastify";

// Icon wrapper with circle
const IconWithCircle = ({ icon, bg }) => (
  <Avatar
    sx={{
      bgcolor: bg,
      width: 30,
      height: 30,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 16,
    }}
  >
    {icon}
  </Avatar>
);

const TheatreCard = ({ theatre, date }) => {
  const [selectedSlot, setSelectedSlot] = useState("");
  const navigate = useNavigate();

  const handleSlotClick = (slot) => {
    if (
      theatre.bookedSlots.includes(slot) ||
      theatre.expiredSlots.includes(slot)
    )
      return;
    setSelectedSlot((prev) => (prev === slot ? "" : slot));
  };

  const handleBookNow = () => {
    if (!selectedSlot) {
      toast.info("please select a slot before booking!");
      return;
    }

    if (date) {
      localStorage.setItem(
        "selectedTheatre",
        JSON.stringify({
          name: theatre.name,
          price: theatre.price,
          slot: selectedSlot,
          extraPerson: theatre.extraPersonCharge,
          maxPeople: theatre.maxPeople,
          totalPeople: theatre.totalPeople,
          bookDate: date,
        })
      );
      toast.success("Theater is selected", {
        autoClose: 2000, // duration in ms
        onClose: () => {
          navigate("/bookingform", {
            state: { theatre, slot: selectedSlot, date },
          });
        },
      });
    } else {
      toast.info("Date is not selected. Redirecting to Home page.!", {
        autoClose: 2000, // duration in ms
        onClose: () => {
          navigate("/home");
        },
      });
    }
  };

  const allSlotsBooked =
    theatre.bookedSlots.length + theatre.expiredSlots.length ===
    theatre.slots.length;

  return (
    <Card
      sx={{
        width: 380, // Increased width
        margin: "auto",
        mb: 4,
        borderRadius: 4,
        boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        },
      }}
    >
      {/* Image */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="180"
          image={`data:image/jpeg;base64,${theatre.image}`}
          alt={theatre.name}
          sx={{ objectFit: "cover" }}
        />
        <Chip
          label={theatre.type}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            color: "#fff",
            background: "linear-gradient(135deg, #bb34a3, #5a24b3)",
            fontWeight: "bold",
          }}
        />
        {allSlotsBooked && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              bgcolor: "rgba(187,52,163,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: "bold",
              fontSize: 24,
              borderRadius: 4,
            }}
          >
            Fully Booked
          </Box>
        )}
      </Box>

      {/* Details */}
      <CardContent>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "#58145e", mb: 1 }}
        >
          {theatre.name}
        </Typography>

        {/* Top Row: Food, People, Cancel */}
        <Stack direction="row" spacing={1} mb={1}>
          <IconWithCircle
            icon={<FastfoodIcon fontSize="small" />}
            bg="#10b981"
          />
          <Typography variant="caption">Food & Drinks</Typography>
          <IconWithCircle icon={<PeopleIcon fontSize="small" />} bg="#3b82f6" />
          <Typography variant="caption">Max {theatre.maxPeople}</Typography>
          <IconWithCircle icon={<CancelIcon fontSize="small" />} bg="#ef4444" />
          <Typography variant="caption">Free Cancel</Typography>
        </Stack>

        {/* Bottom Row: Location */}
        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
          <IconWithCircle
            icon={<LocationOnIcon fontSize="small" />}
            bg="#fbbf24"
          />
          <Typography variant="body2">{theatre.location}</Typography>
        </Stack>

        {/* Slots */}
        <Typography variant="body2" mt={2} sx={{ fontWeight: 500 }}>
          Select Time Slot:
        </Typography>
        <Grid container spacing={1} mt={1}>
          {theatre.slots.map((slot, index) => {
            const isBooked = theatre.bookedSlots.includes(slot);
            const isExpired = theatre.expiredSlots.includes(slot);
            const isSelected = selectedSlot === slot;

            let disabled = isBooked || isExpired;
            let tooltipText = isBooked
              ? "Booked"
              : isExpired
              ? "Expired"
              : "Available";

            return (
              <Grid item xs={4} key={index}>
                <Tooltip title={tooltipText}>
                  <span>
                    <Chip
                      label={slot}
                      clickable={!disabled}
                      onClick={() => handleSlotClick(slot)}
                      disabled={disabled}
                      variant={isSelected ? "filled" : "outlined"}
                      sx={{
                        width: "100%",
                        textAlign: "center",
                        fontWeight: isSelected ? "bold" : "500",
                        background: isSelected
                          ? "linear-gradient(135deg, #bb34a3, #5a24b3)"
                          : undefined,
                        color: isSelected
                          ? "#fff"
                          : isBooked
                          ? "#fff"
                          : "#58145e",
                        boxShadow: isSelected
                          ? "0 4px 15px rgba(187,52,163,0.4)"
                          : "none",
                        border: !isSelected ? "1px solid #bb34a3" : "none",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: !disabled ? "scale(1.05)" : "none",
                        },
                        ...(isBooked && {
                          textDecoration: "line-through",
                          opacity: 0.6,
                        }),
                        ...(isExpired && { opacity: 0.5 }),
                        borderRadius: 2,
                        paddingY: 0.8,
                      }}
                    />
                  </span>
                </Tooltip>
              </Grid>
            );
          })}
        </Grid>

        {/* Price + Book Now */}
        <Typography variant="h6" mt={2} sx={{ color: "#58145e" }}>
          ₹{theatre.price}
        </Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            background: "linear-gradient(135deg, #bb34a3, #5a24b3)",
            color: "#fff",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": {
              background: "linear-gradient(135deg, #d147c9, #7a2fd4)",
            },
          }}
          disabled={allSlotsBooked}
          onClick={handleBookNow}
        >
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
};

const TheatreList = () => {
  const [theatres, setTheatres] = useState([]);
  const location = useLocation();
  const { date } = location.state || {};

  useEffect(() => {
    const fetchTheatres = async () => {
      try {
        const response = await postDataApi("getpackages", {
          bookingDate: date,
        });
        if (response.statusCode === 200) {
          setTheatres(response.theaters || []);
        } else {
          console.error("API returned error:", response);
        }
      } catch (error) {
        console.error("Error fetching theatre data:", error);
      }
    };
    fetchTheatres();
  }, [date]);

  return (
    <Box sx={{ flexGrow: 1, padding: { xs: 2, md: 4 } }}>
      <Grid container spacing={3} justifyContent="center">
        {theatres.length > 0 ? (
          theatres.map((theatre, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <TheatreCard theatre={theatre} date={date} />
            </Grid>
          ))
        ) : (
          <Typography
            variant="h6"
            sx={{ mt: 4, color: "#58145e", textAlign: "center" }}
          >
            No theatres available for the selected date.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default TheatreList;
