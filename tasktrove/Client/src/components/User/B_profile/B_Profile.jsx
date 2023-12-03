import React, { useState } from "react";
import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

const B_Profile = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [City, setCity] = useState("");
  const [Password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/register-company", {
        Name,
        Email,
        City,
        Password,
      })
      .then((res) => {
        if (res.data.Status === "oldUser") {
          alert("User Already Exists!");
        } else {
          alert("User Created Sucessfully!");
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>

      <div className={styles.signup_container}>
        <div className={styles.signup_form_container}>
          <div className={styles.left}>
            <h2>Professional Profile</h2>
            <Link to="/login">
              <button type="button" className={styles.white_btn}>
                Sign in
              </button>
            </Link>
          </div>
          <div className={styles.right}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <h3>Build a professional profile</h3>
              <input
                type="text"
                placeholder="Company Name"
                name="Name"
                onChange={(e) => setName(e.target.value)}
                required
                className={styles.input}
              />

              <input
                type="email"
                placeholder="Company Email"
                name="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
              />
              
              <input
                type="text"
                placeholder="City"
                name="City"
                onChange={(e) => setCity(e.target.value)}
                required
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Password"
                name="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.input}
              />
              <button type="submit" className={styles.green_btn}>
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default B_Profile;
