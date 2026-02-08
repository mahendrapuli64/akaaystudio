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
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate, useLocation } from "react-router-dom";
import { postDataApi } from "../Services/ApiServices";
import { toast } from "react-toastify";

// Circle Icon Component
const IconWithCircle = ({ icon, bg }) => (
  <Avatar
    sx={{
      bgcolor: bg,
      width: 34,
      height: 34,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
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
      toast.info("Please select a slot before booking!");
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
        }),
      );

      toast.success("Theater Selected", {
        autoClose: 1500,
        onClose: () =>
          navigate("/bookingform", {
            state: { theatre, slot: selectedSlot, date },
          }),
      });
    } else {
      toast.info("Please select a date first!", {
        autoClose: 1500,
        onClose: () => navigate("/home"),
      });
    }
  };

  const allSlotsBooked =
    theatre.bookedSlots.length + theatre.expiredSlots.length ===
    theatre.slots.length;

  return (
    <Card
      sx={{
        width: 390,
        borderRadius: "22px",
        overflow: "hidden",
        mb: 4,
        boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        background: "#ffffff",
        transition: "0.3s ease",
        "&:hover": { transform: "translateY(-6px)" },
      }}
    >
      {/* CARD IMAGE */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="260"
          image={`data:image/jpeg;base64,${theatre.image}`}
          alt={theatre.name}
          sx={{
            width: "100%",
            objectFit: "cover",
          }}
        />

        <Chip
          label={theatre.type}
          sx={{
            position: "absolute",
            top: 15,
            right: 15,
            background: "linear-gradient(135deg, #bb34a3, #5a24b3)",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "10px",
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
              bgcolor: "rgba(90,36,179,0.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            Fully Booked
          </Box>
        )}
      </Box>

      {/* CONTENT */}
      <CardContent sx={{ padding: "22px" }}>
        {/* Title */}
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: "#4b006e", mb: 2 }}
        >
          {theatre.name}
        </Typography>

        {/* Icons Row */}
        <Stack direction="row" spacing={3} mb={3}>
          {/* Max People */}
          <Stack direction="row" spacing={1} alignItems="center">
            <IconWithCircle icon={<PeopleIcon />} bg="#7c3aed" />
            <Typography variant="body2" fontWeight={600}>
              Max {theatre.maxPeople}
            </Typography>
          </Stack>

          {/* Duration */}
          <Stack direction="row" spacing={1} alignItems="center">
            <IconWithCircle icon={<AccessTimeIcon />} bg="#ec4899" />
            <Typography variant="body2" fontWeight={600}>
              Duration: 2.5 Hours
            </Typography>
          </Stack>
        </Stack>

        {/* Location */}
        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <IconWithCircle icon={<LocationOnIcon />} bg="#fbbf24" />
          <Typography variant="body2">{theatre.location}</Typography>
        </Stack>

        {/* Time Slot Label */}
        <Typography
          variant="body2"
          sx={{ fontWeight: 600, mt: 2, color: "#4b006e" }}
        >
          Select Time Slot:
        </Typography>

        {/* Slots */}
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
                      disabled={disabled}
                      onClick={() => handleSlotClick(slot)}
                      variant={isSelected ? "filled" : "outlined"}
                      sx={{
                        width: "100%",
                        fontWeight: 600,
                        borderRadius: "12px",
                        borderColor: "#b026ff",
                        background: isSelected
                          ? "linear-gradient(135deg, #bb34a3, #5a24b3)"
                          : "#fff",
                        color: isSelected ? "#fff" : "#4b006e",
                        "&:hover": {
                          transform: !disabled ? "scale(1.07)" : "none",
                        },
                        ...(isBooked && {
                          textDecoration: "line-through",
                          opacity: 0.5,
                        }),
                        ...(isExpired && { opacity: 0.5 }),
                        transition: "0.25s",
                      }}
                    />
                  </span>
                </Tooltip>
              </Grid>
            );
          })}
        </Grid>

        {/* Price */}
        <Typography
          variant="h5"
          sx={{ mt: 3, fontWeight: 700, color: "#4b006e" }}
        >
          ₹{theatre.price}
        </Typography>

        {/* Book Now */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleBookNow}
          disabled={allSlotsBooked}
          sx={{
            mt: 2,
            background: "linear-gradient(135deg, #bb34a3, #5a24b3)",
            textTransform: "none",
            paddingY: 1.4,
            fontSize: 16,
            fontWeight: 700,
            borderRadius: "14px",
            "&:hover": {
              background: "linear-gradient(135deg, #d147c9, #7a2fd4)",
            },
          }}
        >
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
};

// MAIN LIST
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
        }
      } catch (e) {
        console.error("Error:", e);
      }
    };
    fetchTheatres();
  }, [date]);

  return (
    <Box sx={{ padding: { xs: 2, md: 4 } }}>
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
            textAlign="center"
            sx={{ width: "100%", mt: 5, color: "#4b006e" }}
          >
            No theatres available for the selected date.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default TheatreList;
