import React,{useState} from 'react'
import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {message} from "antd";


const Register = () => {
	const [FirstName, setFirstName] = useState("");
	const [LastName, setLastName] = useState("");
	const [Email, setEmail] = useState("");
	const [Password, setPassword] = useState("");
	const navigate = useNavigate()
	const handleSubmit = (e) => {
		e.preventDefault();
		axios
		  .post("http://localhost:3001/register", { FirstName, LastName, Email, Password })
		  .then((res) => {
			if (res.data.Status === "oldUser") {
			  message.error("User Already Exists!");
			alert("User Already Exists!")
			} else {
			  message.success("User Created Sucessfully!");
			alert("User Created Sucessfully!")
			  navigate("/login");
			}
		  })
		  .catch((err) => console.log(err));
	  };

  return (
    <div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
						Sign in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={(e)=> setFirstName(e.target.value)}
							required
							className={styles.input}
							
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={(e)=> setLastName(e.target.value)}
							required
							className={styles.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={(e)=> setEmail(e.target.value)}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={(e)=> setPassword(e.target.value)}
							required
							className={styles.input}
						/>
						<button type="submit" className={styles.green_btn} >
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
  )
}

export default Register