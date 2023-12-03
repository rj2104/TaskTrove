import React, { useState, useEffect } from "react";
import "./user_company.css"; // Import your custom styles
import Header from "./header/Header";
import { Button } from "antd";
import { BsFillChatFill } from "react-icons/bs";
import { MdCall } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import ChatModal from "../ChatModal/ChatModal";

const User_company = ({ company, email }) => {
  const [averageRating, setAverageRating] = useState(0); // State to store average rating
  const [rating, setRating] = useState(averageRating || 0);

  console.log(" email is : ", email);
  const handleRatingClick = (value) => {
    // Send the rating to the backend
    fetch("http://localhost:3001/api/rate-book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, rating: value }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Rating submitted successfully, you can display a success message if needed
          console.log("Rating submitted:", data);
          // Update the local rating state
          setRating(value);
        } else {
          // Handle errors if the rating submission fails
          console.error("Error:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    // Fetch the average rating and set it as the initial rating when the component mounts
    fetch(`http://localhost:3001/api/get-average-rating?email=${email}`)
      .then((response) => response.json())
      .then((data) => {
        setAverageRating(data.averageRating);
        setRating(data.averageRating); // Set the initial rating to the average rating
        console.log("Average Rating:", data.averageRating); // Add this line
      })
      .catch((error) => {
        console.error("Error fetching average rating:", error);
      });
  }, [email]);

  const [isChatModalVisible, setIsChatModalVisible] = useState(false);

  const handleChatButtonClick = () => {
    setIsChatModalVisible(!isChatModalVisible);
  };
  return (
    <>
      <div className="main-container">
        <div className="Profile">
          <img src={`http://localhost:3001/${company.ProfilePicture}`} />
        </div>
        <div className="Details">
          <div className="c_details_main">
            <div className="c_details_name">{company.B_Name}</div>
            <div className="c_details_address">
              {company.Address}, {company.City}, {company.State}
            </div>
            <div className="c_details_time">
              <span>Open Timing: {company.O_Time}</span>
              <span>Close Timing: {company.C_Time}</span>
            </div>
            <div className="c_details_year">
              Established Year: {company.E_Year}
            </div>
          </div>
          <div className="C_details_btns">
            <Button type="primary" className="call_btn">
              <MdCall className="icon_space" />
              Call{" "}
            </Button>
            <Button
              type="primary"
              className="chat_btn"
              onClick={handleChatButtonClick}
            >
              <BsFillChatFill className="icon_space" />
              Chat
            </Button>
            <ChatModal
              isVisible={isChatModalVisible}
              onClose={() => setIsChatModalVisible(false)}
              company={company}
            />
            {/* ... */}
            <div className="avg_rating">
              Rating:{" "}
              {[1, 2, 3, 4, 5].map((value) => (
                <FaStar
                  className="rating-stars"
                  key={value}
                  onClick={() => handleRatingClick(value)}
                  style={{
                    color: value <= (rating || averageRating) ? "gold" : "gray",
                    cursor: "pointer",
                    fontSize: "1.3rem", // Set the font size to 2 rem
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User_company;
