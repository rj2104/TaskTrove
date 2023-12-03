import React, { useEffect, useState } from "react";
import Heading from "../../../Heading";
import "./hero.css";
import logo1 from "../../../../assets/bjpg.jpg";
import logo2 from "../../../../assets/interior1.jpg";
import logo3 from "../../../../assets/event2.jpg";

const Hero = () => {
  const [backgroundImageIndex, setBackgroundImageIndex] = useState(0);
  const images = [logo1, logo2,logo3];

  useEffect(() => {
    let currentIndex = 0;

    const changeBackgroundImage = () => {
      currentIndex = (currentIndex + 1) % images.length;
      setBackgroundImageIndex(currentIndex);
    };

    const intervalId = setInterval(changeBackgroundImage, 3000); // Change image every 30 seconds

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);


  const backgroundImageStyle = {
    backgroundImage: `url(${images[backgroundImageIndex]})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "100vh",
    width: "100%",
    backgroundRepeat: "no-repeat",
  };

  return (
    <>
      <section
        className="hero"
        style={backgroundImageStyle}
      >
        <div className="container">
          <Heading
            title="Tasktrove "
            subtitle="Search the service and get connect to the 20+ companies that are awaiting for providing Services"
          />
        </div>
      </section>
    </>
  );
};

export default Hero;
