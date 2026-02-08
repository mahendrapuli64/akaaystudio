// src/components/BookingField.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Tooltip,
} from "@mui/material";
import dayjs from "dayjs";
import { postDataApi } from "../Services/ApiServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const BookingField = () => {
  const [bookingName, setBookingName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [basePeopleInput, setBasePeopleInput] = useState("");
  const [extraPeople, setExtraPeople] = useState("");
  const [maxBasePeople, setMaxBasePeople] = useState(0);
  const [totalPeopleFromBackend, setTotalPeopleFromBackend] = useState(0);
  const [extraPersonCharge, setExtraPersonCharge] = useState(0);
  const [extraCharges, setExtraCharges] = useState(0);
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  // ✅ Get theatre info from localStorage
  const savedTheatre =
    JSON.parse(localStorage.getItem("selectedTheatre")) || {};

  useEffect(() => {
    fetchBookingData().then((data) => {
      setMaxBasePeople(data.basePeople || 0);
      setTotalPeopleFromBackend(data.totalPeople || 0);
      setExtraPersonCharge(data.extraPersonCharge || 0);
    });
  });

  // ✅ Calculate extra charges dynamically
  useEffect(() => {
    const base = Number(basePeopleInput) || 0;
    const extra = Number(extraPeople) || 0;
    const totalSelected = base + extra;
    const charges =
      totalSelected > maxBasePeople
        ? (totalSelected - maxBasePeople) * extraPersonCharge
        : 0;
    setExtraCharges(charges);
  }, [basePeopleInput, extraPeople, maxBasePeople, extraPersonCharge]);

  const totalAmount = () => {
    const decorationCharge = Number(savedTheatre.price) || 0;
    return decorationCharge + extraCharges;
  };

  const fetchBookingData = () => {
    return Promise.resolve({
      totalPeople: savedTheatre.totalPeople || 0,
      basePeople: savedTheatre.maxPeople || 0,
      extraPersonCharge: savedTheatre.extraPerson || 0,
    });
  };

  const handleNext = async () => {
    const base = Number(basePeopleInput);
    const extra = Number(extraPeople);
    const totalSelected = base + extra;

    if (
      !bookingName ||
      !whatsapp ||
      !email ||
      !address ||
      basePeopleInput === ""
    ) {
      toast.info("Please fill all required fields.");
      return;
    }

    if (!/^[A-Za-z ]+$/.test(bookingName)) {
      toast.info("Booking name should contain only letters and spaces.");
      return;
    }

    if (!/^\d{10}$/.test(whatsapp)) {
      toast.info("WhatsApp number must be 10 digits.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.info("Please enter a valid email address.");
      return;
    }

    if (address.trim().length < 10) {
      toast.info("Please enter a complete address.");
      return;
    }

    if (isNaN(base) || base < 0 || base > maxBasePeople) {
      toast.info(`Base people must be between 0 and ${maxBasePeople}.`);
      return;
    }

    if (isNaN(extra) || extra < 0 || extra > totalPeopleFromBackend - base) {
      toast.info(
        `Extra people must be between 0 and ${totalPeopleFromBackend - base}`,
      );
      return;
    }

    const bookingData = {
      bookingName,
      mobileNumber: whatsapp,
      theaterName: savedTheatre.name || "N/A",
      slot: savedTheatre.slot || "N/A",
      basePeople: base,
      extraPeople: extra,
      totalPeople: totalSelected,
      extraCharges,
      decorationCharges: savedTheatre.price,
      totalAmount: totalAmount(),
      bookingDate: savedTheatre.bookDate,
      emailId: email,
      address: address,
      dateOfBirth: dateOfBirth,
      id: sessionStorage.getItem("bookingId"),
    };

    try {
      const response = await postDataApi("saveuserdetails", bookingData);

      if (response.statusCode === 200) {
        sessionStorage.setItem("bookingId", response.id);
        sessionStorage.setItem("ExtraPerson", extraCharges);
        sessionStorage.setItem("decorationCharges", savedTheatre.price);
        toast.success("Booking saved successfully!", {
          autoClose: 2000, // duration in ms
          onClose: () => {
            navigate("/bookingoccastion");
          },
        });
      } else {
        toast.error("Failed to save booking. Please try again.");
      }
    } catch (error) {
      console.error("Error saving booking:", error);
      toast.error("Error occurred while saving booking.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      sx={{
        pt: { xs: 10, md: 5 }, // padding top (space from header)
        pb: { xs: 10, md: 5 }, // padding bottom (space from footer)
        backgroundColor: "#f7f7f7",
        px: 2,
      }}
    >
      <Card
        sx={{
          width: { xs: "100%", md: "60%", lg: "50%" },
          borderRadius: 4,
          boxShadow: 4,
          p: { xs: 3, md: 5 },
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            sx={{ mb: 4, textAlign: "center", color: "#58145e" }}
          >
            Booking Details
          </Typography>

          {/* Booking Form Fields */}
          <TextField
            fullWidth
            label="Booking Name *"
            placeholder="Enter name for the booking"
            value={bookingName}
            onChange={(e) => setBookingName(e.target.value)}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="WhatsApp Number *"
            placeholder="Enter WhatsApp number"
            value={whatsapp}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d*$/.test(val) && val.length <= 10) setWhatsapp(val);
            }}
            sx={{ mb: 3 }}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date of Birth *"
              format="DD-MM-YYYY"
              value={dateOfBirth ? dayjs(dateOfBirth, "DD-MM-YYYY") : null}
              maxDate={dayjs()}
              onChange={(newValue) => {
                if (newValue) {
                  setdateOfBirth(newValue.format("DD-MM-YYYY")); // store as DD-MM-YYYY
                } else {
                  setdateOfBirth("");
                }
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: { mb: 3 },
                  placeholder: "Select your date of birth",
                },
              }}
            />
          </LocalizationProvider>

          <TextField
            fullWidth
            label="Email ID *"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Address *"
            placeholder="Enter complete address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            multiline
            rows={3}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label={`Base People * (0 - ${maxBasePeople})`}
            placeholder="Enter number of base people"
            value={basePeopleInput}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d*$/.test(val)) {
                const num = Number(val);
                if (num <= maxBasePeople) setBasePeopleInput(val);
                else
                  alert(`Base people must be between 0 and ${maxBasePeople}`);
                if (num < maxBasePeople) setExtraPeople("");
              }
            }}
            sx={{ mb: 3 }}
          />

          <Tooltip
            title={
              basePeopleInput === "" ||
              Number(basePeopleInput) !== maxBasePeople
                ? "Extra people enabled only when base people = max limit"
                : ""
            }
            arrow
          >
            <span>
              <TextField
                fullWidth
                label={`Extra People (Rs ${extraPersonCharge}/person)`}
                placeholder={`Add extra people (max ${
                  totalPeopleFromBackend - (Number(basePeopleInput) || 0)
                })`}
                value={extraPeople}
                onChange={(e) => {
                  const val = e.target.value;
                  const base = Number(basePeopleInput) || 0;
                  const maxExtra = totalPeopleFromBackend - base;
                  if (/^\d*$/.test(val)) {
                    const num = Number(val);
                    if (num <= maxExtra) setExtraPeople(val);
                    else
                      alert(`Extra people must be between 0 and ${maxExtra}`);
                  }
                }}
                sx={{ mb: 3 }}
                disabled={
                  basePeopleInput === "" ||
                  Number(basePeopleInput) < maxBasePeople
                }
              />
            </span>
          </Tooltip>

          {/* Summary */}
          <Typography sx={{ fontWeight: 600, mb: 3 }}>
            Total People:{" "}
            {(Number(basePeopleInput) || 0) + (Number(extraPeople) || 0)} |
            Extra Charges: Rs {extraCharges}
          </Typography>

          {/* Booking Summary */}
          <Box
            sx={{
              mb: 4,
              p: 3,
              borderRadius: 3,
              backgroundColor: "#f2f2f2",
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Booking Summary
            </Typography>
            <Typography>
              Booking Name: {bookingName || "Not entered"}
            </Typography>
            <Typography>
              Theater: {savedTheatre.name || "Not entered"}
            </Typography>
            <Typography>Slot: {savedTheatre.slot || "Not entered"}</Typography>
            <Typography>
              Base People: {basePeopleInput || 0} | Extra People:{" "}
              {extraPeople || 0}
            </Typography>

            <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>
              Expenses
            </Typography>
            <Typography>Decoration: Rs {savedTheatre.price || 0}</Typography>
            <Typography>Extra Charges: Rs {extraCharges}</Typography>
            <Typography sx={{ fontWeight: "bold", mt: 1 }}>
              Total Amount: Rs {totalAmount()}
            </Typography>
          </Box>

          {/* Next Step Button */}
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
        </CardContent>
      </Card>
    </Box>
  );
};

export default BookingField;
