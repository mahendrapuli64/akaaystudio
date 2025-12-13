import React, { useEffect, useState } from "react";
import About from "./About";
import Footer from "./Footer";
import HeroBanner from "./HeroBanner";
import NavBar from "./NavBar";
import ServiceCard from "./ServiceCard";
import ServiceFeatures from "./ServiceFeatures";
import TheaterWork from "./TheaterWork";
import WhyAkaay from "./WhyAkaay";
import ServiceProviding from "./ServiceProviding";
import { getDetailsAPI } from "../Services/ApiServices";
import { toast } from "react-toastify";

export default function HomePage() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    sessionStorage.clear();
    localStorage.clear();
  }, []);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await getDetailsAPI("homeservicecard");
        if (response.statusCode === 200) {
          setCards(response.homeServiceCard || []);
        } else {
          console.error("API returned error:", response);
          toast.error("Server returned an error from API!");
        }
      } catch (error) {
        console.error("Error fetching menu items:", error);
        toast.error("Server error from frontend!");
      }
    };
    fetchMenuItems();
  }, []);

  return (
    <>
      <NavBar />
      <HeroBanner />
      <About />
      <ServiceCard cards={cards} />
      <WhyAkaay />
      <ServiceFeatures />
      <TheaterWork />
      <ServiceProviding />
      <Footer />
    </>
  );
}
