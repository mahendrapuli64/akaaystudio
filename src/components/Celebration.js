import React, { Component } from "react";
import { Box, Typography } from "@mui/material";

class Celebration extends Component {
  render() {
    const { title } = this.props;

    return (
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "90vh",
          backgroundImage: `url('/privatemovies.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          px: 5,
          color: "#fff",
        }}
      >
        {/* Text Overlay */}
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            maxWidth: "600px",
            lineHeight: 1.2,
          }}
        >
          {title.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </Typography>
      </Box>
    );
  }
}

export default Celebration;
