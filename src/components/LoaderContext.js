import React, { createContext, useContext, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner.js";

// Create context
const LoaderContext = createContext();

// Provider component
export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{ loading, showLoader, hideLoader }}>
      {children}
      {/* This will automatically show loader globally */}
      <LoadingSpinner loading={loading} color="#bb34a3" />
    </LoaderContext.Provider>
  );
};

// Custom hook to use loader
export const useLoader = () => useContext(LoaderContext);
