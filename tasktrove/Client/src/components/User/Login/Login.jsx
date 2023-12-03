import React, { useState } from "react";
import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { Email, Password })
      .then((res) => {
        if (res.data.Status === "Success" && res.data.u_type == "user") {
          message.success("Logged In");
          navigate("/");
          localStorage.setItem("user", JSON.stringify({ ...res}));
        } else if (
          res.data.Status === "Success" &&
          res.data.u_type == "company"
        ) {
          localStorage.setItem("user", JSON.stringify({ ...res}));
          message.success("Logged In");
          navigate("/company-home");
        } else {
          alert(res.data);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="Email"
              required
              className={styles.input}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              name="Password"
              required
              className={styles.input}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className={styles.green_btn}>
              Sign In
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>New Here ?</h1>
          <Link to="/register">
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
