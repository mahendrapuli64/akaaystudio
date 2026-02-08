import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  Checkbox,
  FormControlLabel,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { toast } from "react-toastify";
import AdminMenus from "./AdminMenus";

const colors = {
  primaryText: "#58145e",
  primaryGrad: "linear-gradient(135deg, #bb34a3, #5a24b3)",
  hoverGrad: "linear-gradient(135deg, #d147c9, #7a2fd4)",
};

const TermsCondition = () => {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!checked) {
      return toast.info(
        "Please agree to the terms & conditions before continuing.",
      );
    }
    navigate("/paymentgateway");
  };

  const handleoffline = () => {
    if (!checked) {
      return toast.info(
        "Please agree to the terms & conditions before continuing.",
      );
    }
    navigate("/offlinePayment");
  };
  const islogin = localStorage.getItem("adminToken");

  return (
    <>
      {islogin === "ASP" ? <AdminMenus /> : <NavBar />}

      <Container maxWidth="md" sx={{ py: 5 }}>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 4,
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
            animation: "fadeIn 0.5s",
          }}
        >
          {/* Heading */}
          <Typography
            variant="h4"
            fontWeight="900"
            textAlign="center"
            sx={{ color: colors.primaryText, mb: 3 }}
          >
            Terms & Conditions
          </Typography>

          {/* Section 1 */}
          <Typography
            variant="h6"
            fontWeight="700"
            sx={{ color: colors.primaryText, mt: 1 }}
          >
            Important Terms
          </Typography>

          <Divider sx={{ my: 1 }} />

          <List sx={{ pl: 2 }}>
            {[
              "There will be no reduction in price if lesser members arrive.",
              "Smoking/Drinking is NOT allowed inside the theater.",
              "Any damage including decor items must be reimbursed.",
              "Please maintain cleanliness inside the theatre.",
              "Party poppers, snow sprays & cold fires are strictly prohibited.",
              "Carrying Aadhaar card is mandatory.",
              "Couples under 18 are NOT allowed to book.",
              "Pets are not allowed inside the theatre.",
              "₹1000 advance will be charged. Remaining before event.",
              "Cleaning fee up to ₹500 may apply for heavy cleaning.",
            ].map((item, index) => (
              <ListItem
                key={index}
                sx={{ display: "flex", alignItems: "flex-start" }}
              >
                <CheckCircleIcon
                  sx={{ color: "#10b981", fontSize: 18, mt: "4px", mr: 1 }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: "#444", lineHeight: "20px" }}
                >
                  {item}
                </Typography>
              </ListItem>
            ))}
          </List>

          {/* Section 2 */}
          <Typography
            variant="h6"
            fontWeight="700"
            sx={{ color: colors.primaryText, mt: 2 }}
          >
            Refund Policy
          </Typography>

          <Divider sx={{ my: 1 }} />

          <List sx={{ pl: 2 }}>
            <ListItem sx={{ display: "flex" }}>
              <CheckCircleIcon
                sx={{ color: "#fbbf24", fontSize: 18, mt: "4px", mr: 1 }}
              />
              <Typography variant="body2" sx={{ color: "#444" }}>
                Advance amount is Non-Refundable, but you can reschedule based
                on availability.
              </Typography>
            </ListItem>
          </List>

          {/* Agree Checkbox */}
          <Box sx={{ mt: 3 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  sx={{
                    color: colors.primaryText,
                    "&.Mui-checked": { color: colors.primaryText },
                  }}
                />
              }
              label={
                <Typography
                  sx={{ fontSize: "0.9rem", color: colors.primaryText }}
                >
                  I agree to the Terms & Conditions
                </Typography>
              }
            />
          </Box>

          {/* Continue Button */}
          {islogin === "ASP" ? (
            <Button
              variant="contained"
              fullWidth
              disabled={!checked}
              onClick={handleoffline}
              sx={{
                mt: 2,
                py: 1.3,
                fontWeight: 700,
                borderRadius: 3,
                background: colors.primaryGrad,
                "&:hover": {
                  background: colors.hoverGrad,
                },
                "&.Mui-disabled": {
                  opacity: 0.6,
                  background: "#c085c3",
                },
              }}
            >
              Continue
            </Button>
          ) : (
            <Button
              variant="contained"
              fullWidth
              disabled={!checked}
              onClick={handleSubmit}
              sx={{
                mt: 2,
                py: 1.3,
                fontWeight: 700,
                borderRadius: 3,
                background: colors.primaryGrad,
                "&:hover": {
                  background: colors.hoverGrad,
                },
                "&.Mui-disabled": {
                  opacity: 0.6,
                  background: "#c085c3",
                },
              }}
            >
              Continue
            </Button>
          )}
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default TermsCondition;
