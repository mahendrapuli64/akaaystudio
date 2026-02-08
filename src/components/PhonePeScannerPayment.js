import React, { useState, useEffect } from "react";
import { TextField, InputAdornment } from "@mui/material";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Divider,
  Chip,
  Paper,
} from "@mui/material";
import Footer from "./Footer";
import AdminMenus from "./AdminMenus";
import { postDataApi } from "../Services/ApiServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function PhonePeScannerPayment() {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [bookingExp, setBookingExp] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const CONVENIENCE_CHARGE = 26; // Fixed 26 deduction

  // Fetch booking details
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const bookingId = sessionStorage.getItem("bookingId");
        if (!bookingId) return setLoading(false);

        const response = await postDataApi("get-bookingDetails", {
          id: bookingId,
        });

        if (response.statusCode === 200 && response.bookedDetails) {
          // Deduct convenience charge on total amount immediately
          const totalAmount =
            Number(response.bookedDetails.bookedTotalAmount || 0) -
            CONVENIENCE_CHARGE;
          const advanceAmount = 0; // reset to zero
          const balanceAmount = totalAmount - advanceAmount;

          const detailsWithZeroAdvance = {
            ...response.bookedDetails,
            advanceAmount: advanceAmount,
            bookedTotalAmount: totalAmount, // overwrite totalAmount with -26
            balanceAmount: balanceAmount > 0 ? balanceAmount : 0,
          };

          setBookingDetails(detailsWithZeroAdvance);
          setBookingExp(response.bookedExpenses || []);
        }
      } catch (error) {
        console.error("Error fetching booking details:", error);
        toast.error("Error fetching booking details");
      } finally {
        setLoading(false);
      }
    };
    fetchBookingDetails();
  }, []);

  // ===== Handle Booking Button Click =====
  const handleBooking = async () => {
    try {
      const totalAmount = Number(bookingDetails.bookedTotalAmount || 0);
      const advanceAmount =
        bookingDetails.advanceAmount === ""
          ? 0
          : Number(bookingDetails.advanceAmount);
      const balanceAmount = totalAmount - advanceAmount;

      const bookingData = {
        bookingId: bookingDetails.bookingId,
        advanceAmount: advanceAmount,
        totalAmount: totalAmount,
        balancedAmount: balanceAmount > 0 ? balanceAmount : 0,
      };

      console.log("Booking Data:", bookingData);

      const response = await postDataApi("offlineBooking", bookingData);

      if (response.statusCode === 200) {
        toast.success("Booking saved successfully!");
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 2000);
      } else {
        toast.error("Failed to save booking. Please try again.");
      }
    } catch (error) {
      console.error("Error saving booking:", error);
      toast.error("Error occurred while saving booking.");
    }
  };

  if (loading) {
    return (
      <>
        <AdminMenus />
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" color="text.secondary">
            Loading booking details...
          </Typography>
        </Box>
        <Footer />
      </>
    );
  }

  if (!bookingDetails) {
    return (
      <>
        <AdminMenus />
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" color="error">
            No booking details found.
          </Typography>
        </Box>
        <Footer />
      </>
    );
  }

  // ===== Calculations =====
  const totalAmount = Number(bookingDetails.bookedTotalAmount || 0);
  const advanceAmount =
    bookingDetails.advanceAmount === ""
      ? 0
      : Number(bookingDetails.advanceAmount);
  const balanceAmount = totalAmount - advanceAmount;

  return (
    <>
      <AdminMenus />
      <Box
        sx={{
          minHeight: "100vh",
          background: "#f0f2f5",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >
        <Card
          sx={{
            width: { xs: "100%", md: 900 },
            borderRadius: 4,
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
            p: { xs: 2, md: 4 },
            background: "linear-gradient(135deg, #fff, #fdfdfd)",
            transition: "transform 0.3s",
            "&:hover": { transform: "translateY(-3px)" },
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              fontWeight="bold"
              color="#bb34a3"
              textAlign="center"
              mb={1}
            >
              Booking Summary & Advance Payment
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              mb={3}
            >
              Confirm your booking by paying the advance amount.
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Stack spacing={1.5} mb={3}>
              <Paper sx={paperStyle}>
                <Typography>
                  <b>Booking ID:</b>
                </Typography>
                <Typography>{bookingDetails.bookingId}</Typography>
              </Paper>

              <Paper sx={paperStyle}>
                <Typography>
                  <b>Name:</b>
                </Typography>
                <Typography>{bookingDetails.bookingName}</Typography>
              </Paper>

              <Paper sx={paperStyle}>
                <Typography>
                  <b>Theater:</b>
                </Typography>
                <Typography>{bookingDetails.bookedTheater}</Typography>
              </Paper>

              <Paper sx={paperStyle}>
                <Typography>
                  <b>Slot:</b>
                </Typography>
                <Typography>{bookingDetails.bookedTime}</Typography>
              </Paper>

              <Paper sx={paperStyle}>
                <Typography>
                  <b>Occasion:</b>
                </Typography>
                <Typography>{bookingDetails.bookedOccasions}</Typography>
              </Paper>

              <Paper sx={paperStyle}>
                <Typography>
                  <b>Celebration Name:</b>
                </Typography>
                <Typography>{bookingDetails.bookedNickName}</Typography>
              </Paper>

              <Paper sx={paperStyle}>
                <Typography>
                  <b>Date:</b>
                </Typography>
                <Typography>{bookingDetails.bookedDate}</Typography>
              </Paper>

              {bookingExp.length > 0 && (
                <Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    color="#bb34a3"
                    mt={2}
                    mb={1}
                  >
                    Included Expenses
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {bookingExp.map((expense, idx) => (
                      <Chip
                        key={idx}
                        label={`${expense.name} — ₹${expense.price}`}
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {/* Advance */}
              <Paper sx={highlightPaperStyle}>
                <Typography fontWeight={600} color="#bb34a3">
                  Advance Required:
                </Typography>

                <TextField
                  type="number"
                  placeholder="Enter advance"
                  value={
                    bookingDetails.advanceAmount === 0
                      ? ""
                      : bookingDetails.advanceAmount
                  }
                  onChange={(e) => {
                    const val = e.target.value;

                    if (val === "") {
                      setBookingDetails({
                        ...bookingDetails,
                        advanceAmount: "",
                      });
                      return;
                    }

                    const numVal = Number(val);
                    setBookingDetails({
                      ...bookingDetails,
                      advanceAmount: numVal < 0 ? 0 : numVal,
                    });
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
                    ),
                  }}
                />
              </Paper>

              {/* Total Amount */}
              <Paper sx={paperStyle}>
                <Typography>
                  <b>Total Amount:</b>
                </Typography>
                <Typography>₹{totalAmount}</Typography>
              </Paper>

              {/* Balance */}
              <Paper sx={paperStyle}>
                <Typography>
                  <b>Balance:</b>
                </Typography>
                <Typography>
                  ₹{balanceAmount > 0 ? balanceAmount : 0}
                </Typography>
              </Paper>
            </Stack>

            <Divider sx={{ mb: 3 }} />

            <Button
              variant="contained"
              fullWidth
              onClick={handleBooking}
              sx={{
                py: 1.5,
                fontWeight: 600,
                borderRadius: 3,
                background: "linear-gradient(135deg, #bb34a3 0%, #5a24b3 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #d147c9 0%, #7a2fd4 100%)",
                },
                boxShadow: "0 6px 20px rgba(187,52,163,0.3)",
                transition: "all 0.3s ease",
              }}
            >
              Booking
            </Button>

            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              textAlign="center"
              mt={2}
            >
              Convenience charges of ₹26 already deducted.
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Footer />
    </>
  );
}

const paperStyle = {
  p: 2,
  borderRadius: 2,
  bgcolor: "#f7f7f7",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const highlightPaperStyle = {
  p: 2,
  borderRadius: 2,
  bgcolor: "#fff0f6",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
