import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toaster = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={4000} // slightly longer duration
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      toastStyle={{
        borderRadius: "12px",
        background: "#fff",
        color: "#333",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
        padding: "12px 18px",
        fontWeight: 500,
      }}
      bodyStyle={{ margin: 0, padding: 0 }}
      progressStyle={{ background: "#bb34a3" }} // progress bar color
    />
  );
};

export default Toaster;
