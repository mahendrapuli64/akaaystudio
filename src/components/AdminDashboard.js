import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  Select,
  MenuItem,
  Button,
  TablePagination,
} from "@mui/material";
import {
  Menu as MenuIcon,
  KeyboardArrowDown,
  KeyboardArrowUp,
  WhatsApp as WhatsAppIcon,
} from "@mui/icons-material";
import { getDetailsAPI, postDataApi } from "../Services/ApiServices";
import { useNavigate } from "react-router-dom";
import { useLoader } from "./LoaderContext";
import AdminMenus from "./AdminMenus";

export default function AdminDashboard() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openRow, setOpenRow] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showLoader, hideLoader } = useLoader();

  // ✅ Pagination State
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();

  const businessName = "Akaay Studio";
  const contactNumber = "+91 9876543210";

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  // ✅ Pagination Handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        showLoader();

        const response = await getDetailsAPI("admin-details");

        if (response.statusCode === 200) {
          const islogin = localStorage.getItem("adminToken");

          if (islogin !== "ASP") {
            navigate("/admin/adminlogin");
            return;
          }

          setBookings(response.adminBookingPendingDetails);
        } else {
          console.error("Error fetching data:", response.statusMessage);
        }
      } catch (error) {
        console.error("Error fetching decorations:", error);
      } finally {
        hideLoader();
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [navigate]); // ✅ IMPORTANT

  const sendWhatsAppConfirmation = (booking) => {
    const message = `Hello ${booking.name} 👋,

Your booking for *${booking.occasion}* on *${booking.date}* has been *confirmed* ✅

💰 *Advance Payment Received:* ${booking.advanceAmount}

📍 *Location:*
Gala No. 5, Behind Wellness Hospital,
Temghar Pipeline, Bhiwandi

📞 *Contact:* ${contactNumber}  
📸 *Instagram:* https://www.instagram.com/akaay_mini_theater?igsh=Z3E4cWJtcmpweG94

Thank you for choosing *${businessName}* ✨
We look forward to celebrating with you! 🎉`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${booking.phone}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const sendWhatsAppFailed = (booking) => {
    const message = `⚠️ *Booking Failed*

Hello ${booking.name},

We regret to inform you that your booking (ID: *${booking.id}*) for *${booking.occasion}* on *${booking.date}* could not be confirmed due to *non-receipt of payment*. 💸

Please complete your payment to confirm your booking.

📍 *Location:*
Gala No. 5, Behind Wellness Hospital,
Temghar Pipeline, Bhiwandi

📞 *Contact:* +91 9764535650  
📸 *Instagram:* https://www.instagram.com/akaay_mini_theater?igsh=Z3E4cWJtcmpweG94

If you have any questions, feel free to contact us.

– *${businessName}* Team`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${booking.phone}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const getStatusColor = (status) => {
    const value = Number(status);
    switch (value) {
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

  const handleStatusChange = async (id, newStatus) => {
    try {
      const payload = {
        bookingId: id,
        status: newStatus,
      };

      const response = await postDataApi("update-booked-details", payload);

      if (response.statusCode === 200) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b)),
        );
        alert("Booking status is updated");
      } else {
        alert("Failed to update booking status on server");
      }
    } catch (error) {
      alert("Error updating booking status on server");
    }
  };

  if (loading) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 10 }}>
        {/* Loading bookings... */}
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
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
      <AdminMenus />

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

        <Box mt={5}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {/* ✅ Dashboard Summary Cards */}
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
                    <b>Total Amount</b>
                  </TableCell>
                  <TableCell>
                    <b>Advance Amount</b>
                  </TableCell>
                  <TableCell>
                    <b>Balance Amount</b>
                  </TableCell>
                  <TableCell>
                    <b>Date</b>
                  </TableCell>
                  <TableCell>
                    <b>Celebration Name</b>
                  </TableCell>
                  <TableCell>
                    <b>Payment Mode</b>
                  </TableCell>
                  <TableCell>
                    <b>Status</b>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {bookings
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
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
                        <TableCell>{row.amount}</TableCell>
                        <TableCell>{row.advanceAmount}</TableCell>
                        <TableCell>{row.balanceAmount}</TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{row.nickName}</TableCell>
                        <TableCell>{row.mode}</TableCell>
                        <TableCell>
                          <Select
                            value={row.status}
                            size="small"
                            onChange={(e) =>
                              handleStatusChange(row.id, e.target.value)
                            }
                            disabled={Number(row.status) === 3}
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

          {/* ✅ Pagination Component */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={bookings.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
    </Box>
  );
}
