import React, { useState } from "react";
import img from "../contact/pricing.jpg";
import Back from "../../Back";
import "./contact.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { message } from "antd";
import axios from "axios";

const Contact = () => {
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [Email, setEmail] = useState("");
  const [Subject, setSubject] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/contact", {
        Name,
        Email,
        Subject,
        Description,
      })
      .then((res) => {
          message.success("Message sent Sucessfully!");        
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Header />
      <section className="contact mb">
        <Back
          name="Contact Us"
          title="Get Helps & Friendly Support"
          cover={img}
        />
        <div className="container">
          <form className="shadow" onSubmit={handleSubmit}>
            <h3>Fill up the form</h3> <br />
            <div className="text">
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Name"
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email"
              />
            </div>
            <input
              onChange={(e) => setSubject(e.target.value)}
              type="text"
              placeholder="Subject"
            />
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              cols="30"
              rows="10"
              placeholder="Description"
            ></textarea>
            <button>Submit Request</button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
