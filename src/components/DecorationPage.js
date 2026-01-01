// src/pages/DecorationPage.jsx
import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Divider,
  Container,
  Box,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { getDetailsAPI, postDataApi } from "../Services/ApiServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoader } from "./LoaderContext";

// Individual decoration card
const DecorationCard = ({ item, selected, onSelect }) => (
  <Card
    onClick={onSelect}
    sx={{
      maxWidth: { xs: 140, sm: 160, md: 180 },
      borderRadius: 3,
      boxShadow: selected ? 5 : 2,
      textAlign: "center",
      p: 1,
      cursor: "pointer",
      border: selected ? "2px solid #1976d2" : "1px solid #ccc",
      position: "relative",
      transition: "0.3s",
      backgroundColor: selected ? "#e3f2fd" : "white",
      "&:hover": { transform: "scale(1.05)", boxShadow: 4 },
    }}
  >
    {selected && (
      <Box
        sx={{
          position: "absolute",
          top: 6,
          right: 6,
          bgcolor: "white",
          borderRadius: "50%",
        }}
      >
        <CheckCircleIcon color="primary" fontSize="small" />
      </Box>
    )}
    <CardMedia
      component="img"
      height={120}
      image={
        item.image ? `data:image/jpeg;base64,${item.image}` : "/placeholder.jpg"
      }
      alt={item.title}
      sx={{ objectFit: "contain", p: 1 }}
    />
    <CardContent sx={{ p: 0 }}>
      <Typography variant="body2" sx={{ fontWeight: 500, mt: 1 }}>
        {item.title}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary">
        ₹{item.price}
      </Typography>
    </CardContent>
  </Card>
);

const DecorationPage = () => {
  const [selectedItems, setSelectedItems] = useState({});
  const [decorationSections, setDecorationSections] = useState([]);
  const { showLoader, hideLoader } = useLoader();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDecorations = async () => {
      try {
        showLoader();
        const response = await getDetailsAPI("get-decoration");
        if (response.statusCode === 200 && Array.isArray(response.decoration)) {
          setDecorationSections(response.decoration);
        } else {
          toast.error("Error fetching data:");
          console.error("Error fetching data:", response.statusMessage);
        }
      } catch (error) {
        console.error("Error fetching decorations:", error);
      } finally {
        hideLoader();
      }
    };
    fetchDecorations();
  }, []);

  const handleSelect = (parentId, itemId) => {
    setSelectedItems((prev) => {
      const sectionSelections = prev[parentId] || [];
      const isSelected = sectionSelections.includes(itemId);
      const updated = isSelected
        ? sectionSelections.filter((id) => id !== itemId)
        : [...sectionSelections, itemId];
      return { ...prev, [parentId]: updated };
    });
  };

  const handleNext = async () => {
    const selectedData = [];
    decorationSections.forEach((section) => {
      const selectedIds = selectedItems[section.id] || [];
      section.items
        ?.filter((item) => selectedIds.includes(item.id))
        .forEach((item) =>
          selectedData.push({
            id: item.id,
            name: item.title,
            price: item.price,
          })
        );
    });

    // if (selectedData.length === 0)
    //   return toast.info("Please select at least one decoration.");

    try {
      const bookingId = sessionStorage.getItem("bookingId");
      selectedData.push({
        name: "Extra Person",
        price: sessionStorage.getItem("ExtraPerson"),
      });
      selectedData.push({
        name: "Decoration",
        price: sessionStorage.getItem("decorationCharges"),
      });

      const response = await postDataApi("save-decoration", {
        id: bookingId,
        decorations: selectedData,
      });

      if (response.statusCode === 200) {
        toast.success("Decorations saved successfully!", {
          autoClose: 2000, // duration in ms
          onClose: () => {
            navigate("/terms-condition");
          },
        });
      } else {
        console.error("API returned error:", response);
        toast.error("Failed to save decorations. Please try again.");
      }
    } catch (error) {
      console.error("Error saving decorations:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          align="center"
          sx={{ mb: 3 }}
        >
          Select the Decorations
        </Typography>

        {decorationSections.map((section, index) => (
          <Box key={section.id} sx={{ mb: 5 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {section.title}{" "}
              <Typography component="span" color="text.secondary">
                (optional)
              </Typography>
            </Typography>

            <Grid container spacing={2}>
              {section.items?.length > 0 ? (
                section.items.map((item) => (
                  <Grid item xs={6} sm={4} md={2} key={item.id}>
                    <DecorationCard
                      item={item}
                      selected={
                        selectedItems[section.id]?.includes(item.id) || false
                      }
                      onSelect={() => handleSelect(section.id, item.id)}
                    />
                  </Grid>
                ))
              ) : (
                <Typography color="text.secondary" sx={{ ml: 2 }}>
                  No items available in this section.
                </Typography>
              )}
            </Grid>

            {index < decorationSections.length - 1 && (
              <Divider sx={{ my: 4 }} />
            )}
          </Box>
        ))}

        {Object.keys(selectedItems).length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Selected Items Summary:
            </Typography>
            {decorationSections.map((section) => {
              const selectedIds = selectedItems[section.id] || [];
              if (!selectedIds.length) return null;
              const names = section.items
                .filter((item) => selectedIds.includes(item.id))
                .map((item) => item.title);
              return (
                <Box key={section.id} sx={{ mt: 1 }}>
                  <Typography fontWeight="bold">{section.title}:</Typography>
                  <Typography color="text.secondary">
                    {names.join(", ")}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        )}

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
      </Container>
      <Footer />
    </>
  );
};

export default DecorationPage;
