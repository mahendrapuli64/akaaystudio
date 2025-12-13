import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Celebration from "./Celebration";
import AkaayaServices from "./AkaayaServices";

const ServicePage = () => {
  return (
    <>
      <NavBar />
      <main
        style={{
          maxWidth: "100vw", // never exceed viewport width
          overflowX: "hidden", // clip anything wider
        }}
      >
        <Celebration title="Our Services" />
        <AkaayaServices />
      </main>
      <Footer />
    </>
  );
};

export default ServicePage;
