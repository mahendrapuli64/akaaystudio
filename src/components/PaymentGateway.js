import React, { useEffect, useState } from "react";
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
import NavBar from "./NavBar";
import { postDataApi } from "../Services/ApiServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoader } from "../components/LoaderContext";

export default function PaymentPage() {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [bookingExp, setBookingExp] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showLoader, hideLoader } = useLoader();
  const navigate = useNavigate();
  const businessName = "Akaay Studio";

  // Load Razorpay script dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

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
          setBookingDetails(response.bookedDetails);
          setBookingExp(response.bookedExpenses || []);
        }
      } catch (error) {
        console.error("Error fetching booking details:", error);
        toast.error("Error fetching booking details:");
      } finally {
        setLoading(false);
      }
    };
    fetchBookingDetails();
  }, []);

  // Razorpay payment handler
  const handleRazorpayPayment = async () => {
    if (!bookingDetails) return;

    try {
      const response = await postDataApi("create-order", {
        // advanceAmount: bookingDetails.advanceAmount,
        advanceAmount: "1",
        bookingId: bookingDetails.bookingId,
      });

      if (!response.orderId)
        return toast.error("Failed to create Razorpay order");
      showLoader();
      const options = {
        key: response.publicKey,
        amount: response.amount,
        currency: "INR",
        name: businessName,
        description: "Advance Payment for Booking",
        order_id: response.orderId,
        handler: async (rzpResponse) => {
          const verifyResp = await postDataApi("verify-payment", {
            razorpayOrderId: rzpResponse.razorpay_order_id,
            razorpayPaymentId: rzpResponse.razorpay_payment_id,
            razorpaySignature: rzpResponse.razorpay_signature,
            bookingId: bookingDetails.bookingId,
          });

          if (verifyResp.statusCode === 200) {
            hideLoader();
            toast.success("Payment verified successfully!", {
              autoClose: 2000, // 5 seconds
              onClose: () => {
                navigate("/");
              },
            });
          } else {
            hideLoader();
            toast.error("Payment verification failed!", {
              autoClose: 2000, // 5 seconds
              onClose: () => {
                navigate("/");
              },
            });
          }
        },
        modal: {
          ondismiss: function () {
            // User cancelled the payment window
            hideLoader();
            console.log("User closed Razorpay popup");
            toast.info("Payment Cancelled");
          },
        },
        prefill: {
          name: bookingDetails.bookingName,
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: { color: "#bb34a3" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      rzp.on("payment.failed", (res) => {
        hideLoader();
        console.error("Payment failed:", res.error); // Log full error object
        toast.error("Payment failed: ", {
          autoClose: 2000, // duration in ms
          pauseOnHover: true,
        });
      });

      rzp.on("payment.cancel", () => {
        hideLoader();
        console.log("Payment cancelled by user");
        toast.info("Payment cancelled by user", {
          autoClose: 2000,
          pauseOnHover: true,
        });
      });

      rzp.on("modal.closed", () => {
        hideLoader();
        console.warn("User closed Razorpay popup.");
        toast.info("Payment cancelled by user.", {
          autoClose: 2000,
          pauseOnHover: true,
        });
      });
    } catch (error) {
      hideLoader();
      console.error("Razorpay error:", error);
      toast.error("Razorpay error:");
    }
  };

  if (loading) {
    return (
      <>
        <NavBar />
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
        <NavBar />
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

  return (
    <>
      <NavBar />
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

            {/* Booking Details */}
            <Stack spacing={1.5} mb={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "#f7f7f7",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body1">
                  <b>Booking ID:</b>
                </Typography>
                <Typography variant="body1">
                  {bookingDetails.bookingId}
                </Typography>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "#f7f7f7",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body1">
                  <b>Name:</b>
                </Typography>
                <Typography variant="body1">
                  {bookingDetails.bookingName}
                </Typography>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "#f7f7f7",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body1">
                  <b>Occasion:</b>
                </Typography>
                <Typography variant="body1">
                  {bookingDetails.bookedOccasions}
                </Typography>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "#f7f7f7",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body1">
                  <b>Date:</b>
                </Typography>
                <Typography variant="body1">
                  {bookingDetails.bookedDate}
                </Typography>
              </Paper>

              {/* Included Expenses */}
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

              {/* Amounts */}
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "#fff0f6",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Typography variant="body1" fontWeight={600} color="#bb34a3">
                  Advance Required:
                </Typography>
                <Typography variant="body1" fontWeight={600} color="#bb34a3">
                  ₹{bookingDetails.advanceAmount}
                </Typography>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "#f7f7f7",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body1">
                  <b>Total Amount:</b>
                </Typography>
                <Typography variant="body1">
                  {bookingDetails.bookedTotalAmount}
                </Typography>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "#f7f7f7",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body1">
                  <b>Balance:</b>
                </Typography>
                <Typography variant="body1">
                  {bookingDetails.bookedBalanceAmount}
                </Typography>
              </Paper>
            </Stack>

            <Divider sx={{ mb: 3 }} />

            {/* Razorpay Pay Button */}
            <Button
              variant="contained"
              fullWidth
              onClick={handleRazorpayPayment}
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
              Pay Now
            </Button>

            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              textAlign="center"
              mt={2}
            >
              Booking will be confirmed only after successful advance payment.
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Footer />
    </>
  );
}
