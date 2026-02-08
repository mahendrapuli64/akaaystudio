import React from "react";

import NavBar from "./NavBar";
import Footer from "./Footer";
import BookingField from "./BookingField";
import AdminMenus from "./AdminMenus";

export default function BookingForm() {
  const islogin = localStorage.getItem("adminToken");
  return (
    <>
      {islogin === "ASP" ? <AdminMenus /> : <NavBar />}
      <BookingField />
      <Footer />
    </>
  );
}
