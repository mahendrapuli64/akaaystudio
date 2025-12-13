import React from "react";
import RiseLoader from "react-spinners/RiseLoader";

const LoadingSpinner = ({
  loading = false,
  color = "#36d7b7",
  size = 15,
  speed = 1,
  fullscreen = true,
}) => {
  if (!loading) return null;

  const wrapperStyle = fullscreen
    ? {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(255,255,255,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }
    : { display: "inline-flex" };

  return (
    <div style={wrapperStyle}>
      <RiseLoader color={color} size={size} speedMultiplier={speed} />
    </div>
  );
};

export default LoadingSpinner;
