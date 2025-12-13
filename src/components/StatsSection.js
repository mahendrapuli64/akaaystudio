// StatsSection.jsx
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import CountUp from "react-countup";

const stats = [
  { label: "Party Completed", end: 1500, icon: "🎉" },
  { label: "Clients Happy", end: 1000, icon: "😊" },
  { label: "Quality Guarantee", end: 100, suffix: "%", icon: "🛡️" },
];

const StatsSection = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #009688, #673ab7, #e91e63)",
        py: 6,
        color: "white",
        mt: 4,
        p: { xs: 2, md: 4 },
      }}
    >
      {/* Outer horizontal row of stats */}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={6}
        wrap="nowrap"
        sx={{
          overflowX: { xs: "auto", md: "visible" }, // scroll on small screens
        }}
      >
        {stats.map((stat, index) => (
          <Grid item key={index}>
            {/* Inner flex row for icon + label + number */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                minWidth: 240,
                px: 2,
              }}
            >
              {/* Icon */}
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  backgroundColor: "rgba(255,255,255,0.15)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                  flexShrink: 0,
                }}
              >
                {stat.icon}
              </Box>

              {/* Label + Number side by side */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1.5,
                  flexWrap: "wrap",
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {stat.label}
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  <CountUp
                    start={0}
                    end={stat.end}
                    duration={2.5}
                    separator=","
                    suffix={stat.suffix || "+"}
                  />
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatsSection;
