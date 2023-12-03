import React from "react";
import { footer } from "../../data/Data";
import "./footer.css";
import img from "../../../assets/logo1.png";
import { Link } from "react-router-dom";
const Footer = () => {
  const userData = localStorage.getItem("user");

  return (
    <>
      <footer>
        <div className="container">
          <div className="box">
            <div className="logo">
              <img src={img} alt=" " />
              <h2>Do You Need Help With Anything?</h2>
              <p>We'll help you to grow your career and growth.</p>

              {/* <div className="input flex">
                <Link to="/contact">
                  <button>Contact Us </button>
                </Link>
              </div> */}
                      {userData ? (
          <Link className="nav_item contact_btn_f" to="/contact">
            Contact Us
          </Link>
        ) : (
          <Link
            className="nav_item contact_btn_f"
            onClick={() => alert("Please log in first.")}
          >
            Contact Us
          </Link>
        )}
            </div>
          </div>

          {footer.map((val) => (
            <div className="box">
              <h3>{val.title}</h3>
              <ul>
                {val.text.map((items) => (
                  <li> {items.list} </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
      <div className="legal">
        <span>© 2023 TaskTrove. Created By Rahul Jain.</span>
      </div>
    </>
  );
};

export default Footer;
