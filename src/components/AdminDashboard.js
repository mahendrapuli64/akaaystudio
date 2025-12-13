import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  Dialog,
  DialogContent,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Logout as LogoutIcon,
  KeyboardArrowDown,
  KeyboardArrowUp,
  WhatsApp as WhatsAppIcon,
} from "@mui/icons-material";
import { getDetailsAPI, postDataApi } from "../Services/ApiServices";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openRow, setOpenRow] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openImage, setOpenImage] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const businessName = "Akaay Studio";
  const contactNumber = "+91 9876543210";

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    sessionStorage.clear();
    navigate("/admin/adminlogin");
  };

  // ✅ Fetch booking details from backend (with fallback sample data)
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await getDetailsAPI("admin-Details");
        if (response.statusCode === 200) {
          const islogin = localStorage.getItem("adminToken");
          if (islogin !== "ASP") {
            navigate("/admin/adminlogin");
          }
          setBookings(response.adminBookingPendingDetails);
        } else {
          console.error("Error fetching data:", response.statusMessage);
        }
      } catch (error) {
        console.error("Error fetching decorations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookingDetails();
  }, [navigate]);

  // ✅ Image view handler
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpenImage(true);
  };

  // ✅ WhatsApp: Booking Confirmation
  const sendWhatsAppConfirmation = (booking) => {
    const message = `Hello ${booking.name}, your booking for *${booking.occasion}* on *${booking.date}* has been confirmed! ✅

Advance payment of ${booking.advanceAmount} received successfully.

Thank you for choosing ${businessName}!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${booking.phone}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  // ⚠️ WhatsApp: Booking Failed
  const sendWhatsAppFailed = (booking) => {
    const message = `⚠️ *Booking Failed*

Hello ${booking.name},

We regret to inform you that your booking (ID: *${booking.id}*) for *${booking.occasion}* on *${booking.date}* could not be confirmed due to *non-receipt of payment or not received payment*. 💸

Please complete your payment to confirm your booking.

If you have any questions, contact us at *${contactNumber}*.

– *${businessName}* Team`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${booking.phone}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  // ✅ Status color helper
  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return "green";
      case 0:
        return "orange";
      case 3:
        return "red";
      default:
        return "gray";
    }
  };

  // ✅ Handle status change
  const handleStatusChange = async (id, newStatus) => {
    // Update UI immediately (optimistic update)

    try {
      // Prepare payload for backend
      const payload = {
        bookingId: id,
        status: newStatus,
      };

      // Call your API (using your helper)
      const response = await postDataApi("update-booked-details", payload);

      if (response.statusCode === 200) {
        console.log("Booking status updated successfully");
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
        );
        alert("Booking status is updated ");
      } else {
        console.error("Failed to update booking:", response.statusMessage);
        alert("Failed to update booking status on server");
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      alert("Error updating booking status on server");
    }
  };

  if (loading) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 10 }}>
        Loading bookings...
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      {/* ✅ AppBar */}
      <AppBar position="fixed" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* ✅ Sidebar */}
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{ "& .MuiDrawer-paper": { width: 240 } }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>

            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon color="error" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* ✅ Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          backgroundColor: "#f9f9f9",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Welcome, Admin 👋
        </Typography>

        {/* ✅ Table Section */}
        <Box mt={5}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Recent Bookings
          </Typography>

          <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
                  <TableCell />
                  <TableCell>
                    <b>Booking ID</b>
                  </TableCell>
                  <TableCell>
                    <b>Name</b>
                  </TableCell>
                  <TableCell>
                    <b>Occasion</b>
                  </TableCell>
                  <TableCell>
                    <b>Image</b>
                  </TableCell>
                  <TableCell>
                    <b>Amount</b>
                  </TableCell>
                  <TableCell>
                    <b>Date</b>
                  </TableCell>
                  <TableCell>
                    <b>Status</b>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {bookings.map((row) => (
                  <React.Fragment key={row.id}>
                    <TableRow
                      hover
                      sx={{
                        cursor: "pointer",
                        backgroundColor:
                          openRow === row.id ? "#f1f8ff" : "transparent",
                      }}
                      onClick={() =>
                        setOpenRow(openRow === row.id ? null : row.id)
                      }
                    >
                      <TableCell>
                        {openRow === row.id ? (
                          <KeyboardArrowUp />
                        ) : (
                          <KeyboardArrowDown />
                        )}
                      </TableCell>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.occasion}</TableCell>
                      <TableCell>
                        <img
                          src={row.image}
                          alt={row.name}
                          style={{
                            width: 60,
                            height: 60,
                            borderRadius: 8,
                            cursor: "pointer",
                            objectFit: "cover",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleImageClick(row.image);
                          }}
                        />
                      </TableCell>
                      <TableCell>{row.amount}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>
                        <Select
                          value={row.status}
                          size="small"
                          onChange={(e) =>
                            handleStatusChange(row.id, e.target.value)
                          }
                          disabled={row.status === 1}
                          sx={{
                            fontWeight: 600,
                            backgroundColor: "#fff",
                            borderRadius: 1,
                            minWidth: 120,
                            "& .MuiSelect-select": {
                              color: getStatusColor(row.status),
                            },
                          }}
                        >
                          <MenuItem value={0}>Pending</MenuItem>
                          <MenuItem value={1}>Completed</MenuItem>
                          <MenuItem value={3}>Failed</MenuItem>
                        </Select>
                      </TableCell>
                    </TableRow>

                    {/* ✅ Expandable Payment Details */}
                    <TableRow>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={8}
                      >
                        <Collapse
                          in={openRow === row.id}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box margin={2}>
                            <Typography variant="subtitle1" gutterBottom>
                              Payment Details for {row.id}
                            </Typography>
                            <Table size="small">
                              <TableHead>
                                <TableRow sx={{ backgroundColor: "#f1f8e9" }}>
                                  <TableCell>
                                    <b>Charges Name</b>
                                  </TableCell>
                                  <TableCell>
                                    <b>Amount</b>
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {row.payments.map((p, index) => (
                                  <TableRow key={index}>
                                    <TableCell>{p.name}</TableCell>
                                    <TableCell>{p.price}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>

                            {/* ✅ WhatsApp Buttons */}
                            <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                              <Button
                                variant="contained"
                                color="success"
                                startIcon={<WhatsAppIcon />}
                                onClick={() => sendWhatsAppConfirmation(row)}
                              >
                                Send Booked Msg
                              </Button>

                              <Button
                                variant="contained"
                                color="error"
                                startIcon={<WhatsAppIcon />}
                                onClick={() => sendWhatsAppFailed(row)}
                              >
                                Send Failed Msg
                              </Button>
                            </Box>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      {/* ✅ Image Popup */}
      <Dialog
        open={openImage}
        onClose={() => setOpenImage(false)}
        maxWidth="md"
      >
        <DialogContent>
          <img
            src={selectedImage}
            alt="Full view"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 10,
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
