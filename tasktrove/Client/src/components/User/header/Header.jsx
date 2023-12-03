import React, { useEffect, useState } from "react";
import "./header.css";
import { nav } from "../../data/Data";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo1.png";
import axios from "axios";
import { message } from "antd";

const Header = () => {
  const [navList, setNavList] = useState(false);
  const [Records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const userData = localStorage.getItem("user");
  const [showLogoutButton, setShowLogoutButton] = useState(!!userData);

  useEffect(() => {
    // Fetch data from API and set initial records
    axios
      .get(`http://localhost:3001/get-companies`)
      .then((response) => {
        setRecords(response.data);
        setFilteredRecords(response.data); // Initialize filtered records with all records
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
      });
  }, []);

  const companies_length = Records.length;

  const LogoutHandler = () => {
    localStorage.removeItem("user");
    setShowLogoutButton(false);
    message.success("Logged Out");
  };

  return (
    <div className="navbar">
      <div className="nav_logo">
        <Link className="logo" to="/">
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className="nav_items">
        <Link className="nav_item" to="/">
          Home
        </Link>

        {userData ? (
          <Link className="nav_item" to="/services">
            Services
          </Link>
        ) : (
          <Link
            className="nav_item"
            onClick={() => alert("Please log in first.")}
          >
            Services
          </Link>
        )}

        {userData ? (
          <Link className="nav_item" to="/contact">
            Contact
          </Link>
        ) : (
          <Link
            className="nav_item"
            onClick={() => alert("Please log in first.")}
          >
            Contact
          </Link>
        )}
      </div>
      <div className="navbar_buttons">
        <div className="nav_company_list">
          <Link className="btn1 sign_btn" to="/profile">
            <span>{companies_length}</span>Company Listing
          </Link>
        </div>
        <div className="nav_signup">
          <Link className="btn1 sign_btn" to="/Register">
            SignIn / SignUp
          </Link>
        </div>
        {showLogoutButton && (
          <div className="nav_logout">
            <Link className="btn1 sign_btn" to="/" onClick={LogoutHandler}>
              <i className="fa fa-sign-out"></i> Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
