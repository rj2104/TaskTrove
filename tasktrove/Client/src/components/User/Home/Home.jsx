import React from "react";
import Featured from "./featured/Featured";
import Hero from "./hero/Hero";
import Recent from "./recent/Recent";
import Team from "./team/Team";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Review from "./review/Review";
import GrowBusiness from "./business_grow/GrowBusiness";
import Growth from "./Growth/Growth";

const Home = () => {
  return (
    <>
      <Header />

      <Hero />
      <Featured />
      <GrowBusiness/>
      <Growth/>
      <Footer />
    </>
  );
};

export default Home;
