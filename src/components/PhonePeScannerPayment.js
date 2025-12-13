import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { postDataApi, postImage } from "../Services/ApiServices";
import { useNavigate } from "react-router-dom";

export default function BookingPaymentSummary() {
  const [upiUrl, setUpiUrl] = useState("");
  const [bookingDetails, setBookingDetails] = useState(null);
  const [bookingExp, setBookingExp] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const upiId = "dattapuli7777@oksbi";
  const businessName = "Akaay Studio";

  // ✅ Fetch booking details from API
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const bookingId = sessionStorage.getItem("bookingId");
        if (!bookingId) {
          console.warn("No booking ID found in sessionStorage");
          setLoading(false);
          return;
        }

        const response = await postDataApi("get-bookingDetails", {
          id: bookingId,
        });

        if (response.statusCode === 200 && response.bookedDetails) {
          setBookingDetails(response.bookedDetails);
          setBookingExp(response.bookedExpenses || []);
        } else {
          console.error("API returned error:", response);
        }
      } catch (error) {
        console.error("Error fetching booking details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, []);

  // ✅ Generate UPI link when details are loaded
  useEffect(() => {
    if (bookingDetails?.advanceAmount) {
      const uri = `upi://pay?pa=${encodeURIComponent(
        upiId
      )}&pn=${encodeURIComponent(businessName)}&am=${encodeURIComponent(
        bookingDetails.advanceAmount
      )}&cu=INR`;
      setUpiUrl(uri);
    }
  }, [bookingDetails]);

  // ✅ Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file && file.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  // ✅ Submit uploaded file to backend
  const handleSubmit = async () => {
    if (!selectedFile || !bookingDetails) {
      alert("Please select a file before submitting!");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("bookingId", bookingDetails.bookingId);
      formData.append("totalAmount", bookingDetails.bookedTotalAmount);
      formData.append("balancedAmount", bookingDetails.bookedBalanceAmount);
      formData.append("advanceAmount", bookingDetails.advanceAmount);
      formData.append("file", selectedFile);

      const response = await postImage("upload-paymentProof", formData);

      if (response.statusCode === 200) {
        alert(
          "✅ File uploaded successfully!\n\nYour booking is now *in processing*.\n\nWe will verify your payment proof, and you will receive a WhatsApp message from *Akkay Studio* within 2 hours regarding your booking status"
        );
        setSelectedFile(null);
        setPreviewUrl(null);
        navigate("/");
      } else {
        alert("Failed to upload file. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading.");
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ Send WhatsApp confirmation
  //   const sendWhatsAppConfirmation = () => {
  //     if (!bookingDetails) return;

  //     const phoneNumber = "919356718212"; // Replace dynamically if possible
  //     const message = `Hello ${bookingDetails.bookingName}, your booking for *${bookingDetails.bookedOccasions}* on *${bookingDetails.bookedDate}* has been confirmed! ✅

  // Advance payment of ₹${bookingDetails.advanceAmount} received successfully.

  // Thank you for choosing ${businessName}!`;

  //     const encodedMessage = encodeURIComponent(message);
  //     const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  //     window.open(whatsappUrl, "_blank");
  //   };

  //   const sendWhatsAppFailed = () => {
  //     if (!bookingDetails) return;

  //     const phoneNumber = "919356718212"; // Replace dynamically if possible
  //     const message = `⚠️ *Booking Failed*

  // Hello ${bookingDetails.bookingName},

  // We regret to inform you that your booking (ID: *${bookingDetails.bookingId}*) for *${bookingDetails.bookedOccasions}* on *${bookingDetails.bookedDate}* could not be confirmed due to *non-receipt of payment*. 💸

  // Please complete your payment to confirm your booking.

  // If you have any questions or need help, feel free to contact us at: *${contactNumber}*

  // – *${businessName}* Team`;

  //     const encodedMessage = encodeURIComponent(message);
  //     const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  //     window.open(whatsappUrl, "_blank");
  //   };

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
          background: "#f5f7fa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Card
          sx={{
            width: 900,
            borderRadius: 4,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            p: 2,
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#1e88e5",
                mb: 1,
                textAlign: "center",
              }}
            >
              Booking Summary & Advance Payment
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, textAlign: "center" }}
            >
              Please scan and pay the advance amount to confirm your booking.
              Advance is non-refundable.
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {/* ✅ Booking Details */}
            <Stack spacing={1.2} sx={{ mb: 3 }}>
              <Typography variant="body1">
                <b>Booking ID:</b> {bookingDetails.bookingId}
              </Typography>
              <Typography variant="body1">
                <b>Name:</b> {bookingDetails.bookingName}
              </Typography>
              <Typography variant="body1">
                <b>Occasion:</b> {bookingDetails.bookedOccasions}
              </Typography>
              <Typography variant="body1">
                <b>Date:</b> {bookingDetails.bookedDate}
              </Typography>

              {bookingExp.length > 0 && (
                <>
                  <Typography
                    variant="h6"
                    sx={{ mt: 2, mb: 1, fontWeight: 600, color: "#1e88e5" }}
                  >
                    Included Expenses
                  </Typography>
                  {bookingExp.map((expense, index) => (
                    <Typography key={index} variant="body1" sx={{ ml: 2 }}>
                      • {expense.name} — ₹{expense.price}
                    </Typography>
                  ))}
                </>
              )}

              <Typography variant="body1">
                <b>Total Amount:</b> ₹{bookingDetails.bookedTotalAmount}
              </Typography>
              <Typography variant="body1" color="primary">
                <b>Advance Required:</b> ₹{bookingDetails.advanceAmount}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                <b>Balance:</b> ₹{bookingDetails.bookedBalanceAmount}
              </Typography>
            </Stack>

            <Divider sx={{ mb: 3 }} />

            {/* ✅ QR Code */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                Scan to Pay (PhonePe / GPay / Paytm)
              </Typography>

              {upiUrl && <QRCodeCanvas value={upiUrl} size={220} />}

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1, textAlign: "center" }}
              >
                UPI ID: {upiId}
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* ✅ Upload Payment Proof */}
            <Box
              sx={{
                textAlign: "center",
                mb: 3,
                border: "1px dashed #ccc",
                borderRadius: 2,
                p: 2,
              }}
            >
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                Upload Payment Proof
              </Typography>

              <input
                accept="image/jpeg"
                type="file"
                id="file-upload"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload">
                <Button
                  variant="contained"
                  component="span"
                  sx={{
                    backgroundColor: "#1976d2",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#115293" },
                  }}
                >
                  Choose File
                </Button>
              </label>

              {selectedFile && (
                <>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Selected: {selectedFile.name}
                  </Typography>
                  {previewUrl && (
                    <Box
                      sx={{
                        mt: 2,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={previewUrl}
                        alt="Preview"
                        style={{
                          width: 200,
                          height: "auto",
                          borderRadius: 8,
                          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                        }}
                      />
                    </Box>
                  )}
                </>
              )}
            </Box>

            {/* ✅ Action Buttons */}
            <Stack spacing={2}>
              {/* <Button
                variant="outlined"
                fullWidth
                onClick={sendWhatsAppConfirmation}
                sx={{
                  borderColor: "#25D366",
                  color: "#25D366",
                  "&:hover": { backgroundColor: "#25D366", color: "#fff" },
                  py: 1.2,
                  fontWeight: 600,
                }}
              >
                Send WhatsApp Confirmation
              </Button> */}

              <Button
                variant="contained"
                fullWidth
                disabled={submitting}
                onClick={handleSubmit}
                sx={{
                  py: 1.2,
                  fontWeight: 600,
                  backgroundColor: "#1e88e5",
                  "&:hover": { backgroundColor: "#1565c0" },
                }}
              >
                {submitting ? "Uploading..." : "Submit Payment Proof"}
              </Button>
            </Stack>

            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              sx={{ textAlign: "center", mt: 2 }}
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
