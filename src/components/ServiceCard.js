import React, { Component } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";

class ServiceCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCard: null,
    };
  }

  handleSelect = (index) => {
    this.setState({ selectedCard: index });
  };

  render() {
    const cards = this.props.cards || [];
    const { selectedCard } = this.state;

    return (
      <>
        <style>
          {`
            @keyframes fadeInUp {
              0% {
                opacity: 0;
                transform: translateY(30px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}
        </style>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            padding: 3,
            justifyContent: "center",
            background: "linear-gradient(135deg, #1a0033 10%, #bb34a3 100%)",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          {cards.map((card, index) => (
            <Card
              key={card.id}
              sx={{
                width: "30%",
                minWidth: 260,
                flexGrow: 1,
                borderRadius: 4,
                backgroundColor: "#fff",
                border:
                  selectedCard === index
                    ? "2px solid #f8cd00"
                    : "1px solid transparent",
                boxShadow:
                  selectedCard === index
                    ? "0px 0px 20px rgba(248, 205, 0, 0.6)"
                    : "0px 4px 10px rgba(0, 0, 0, 0.2)",
                transform: selectedCard === index ? "scale(1.05)" : "scale(1)",
                transition:
                  "all 0.4s cubic-bezier(0.4, 0, 0.2, 1), border 0.3s ease",
                animation: `fadeInUp 0.8s ease ${index * 0.15}s both`,
                "&:hover": {
                  transform: "scale(1.07)",
                  boxShadow: "0px 0px 25px rgba(187, 52, 163, 0.5)",
                },
              }}
            >
              <CardActionArea
                onClick={() => this.handleSelect(index)}
                sx={{
                  height: "100%",
                  padding: 2,
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: 2,
                  transition: "background 0.3s ease",
                }}
              >
                {/* Left Image */}
                {card.image && (
                  <Box
                    component="img"
                    src={`data:image/jpeg;base64,${card.image}`}
                    alt={card.title}
                    sx={{
                      width: 70,
                      height: 70,
                      objectFit: "cover",
                      borderRadius: "50%",
                      boxShadow: "0px 0px 10px rgba(187, 52, 163, 0.5)",
                      border: "2px solid #bb34a3",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "rotate(5deg) scale(1.1)",
                      },
                    }}
                  />
                )}

                {/* Title & Description */}
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: 700,
                      color: "#58145e",
                      mb: 0.5,
                    }}
                  >
                    {card.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 500,
                      color: "#333",
                      mb: 2,
                    }}
                  >
                    {card.description}
                  </Typography>

                  {/* 🌈 Gradient Button */}
                  <Button
                    variant="contained"
                    sx={{
                      marginTop: 5,
                      width: 200,
                      paddingY: 1.3,
                      borderRadius: "50px",
                      fontWeight: 600,
                      fontSize: "1rem",
                      textTransform: "none",
                      background: "linear-gradient(135deg, #bb34a3, #5a24b3)",
                      color: "#fff",
                      boxShadow: "0 4px 15px rgba(187, 52, 163, 0.4)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "linear-gradient(135deg, #d147c9, #7a2fd4)",
                        boxShadow: "0 6px 20px rgba(187, 52, 163, 0.6)",
                        transform: "scale(1.05)",
                      },
                      "&:active": {
                        transform: "scale(0.97)",
                        boxShadow: "0 3px 10px rgba(187, 52, 163, 0.3)",
                      },
                    }}
                  >
                    Book Now
                  </Button>
                </Box>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </>
    );
  }
}

export default ServiceCard;
