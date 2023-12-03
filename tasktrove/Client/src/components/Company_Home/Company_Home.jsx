import React, { useEffect, useState } from "react";
import "./Company_Home.css";
import axios from "axios";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import HeaderCompany from "../User/header/HeaderCompany";

const Company_Home = () => {
  const [Records, setRecords] = useState([]);
  const [CEmail, setCEmail] = useState("");
  const [BName, setBName] = useState("");
  const [City, setCity] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    B_Name: "",
    Email: "",
    Service: "",
    Service_Type: "",
    State: "",
    City: "",
    Address: "",
    C_Link: "",
    O_Time: "",
    C_Time: "",
    E_Year: "",
    ProfilePicture: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, ProfilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // setFormData({...formData,B_Name: BName, Email: CEmail, City: City});

    const data = new FormData();
    for (const key in formData) {
      if(key == "B_Name"){
        data.append(key, BName);
      }else if(key == "Email"){
        data.append(key, CEmail);
      }else if(key == "City"){
        data.append(key, City);
      }else{
        data.append(key, formData[key]);
      }
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/company-home",
        data
      );
      if (response.status === 200) {
        navigate("/");
      }
      message.success("Details Submitted");
      console.log("Profile data saved:", response.data);
      // Reset the form fields after submission if needed
      setFormData({
        B_Name: "",
        Email: "",
        Service: "",
        Service_Type:"",
        State: "",
        City: "",
        Address: "",
        C_Link: "",
        O_Time: "",
        C_Time: "",
        E_Year: "",
        ProfilePicture: null,
      });
    } catch (error) {
      console.error("Error saving Profile data:", error);
    }
  };

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      const email = user.data.Email
      // console.log(email);
        axios
          .get(`http://localhost:3001/register-company/${email}`)
          .then((response) => {
            const data = response.data[0];
            console.log(data);
            setRecords(response.data);
            setCEmail(data.Email);
            setBName(data.Name);
            setCity(data.City);
          })
          .catch((error) => {
            console.error('Error fetching companies:', error);
          });
      }, []); 

      // console.log(CEmail, BName, City)

  return (
    <div>
      <HeaderCompany />
      <div className="profile-builder">
        <form onSubmit={handleSubmit}>
          <h3>Build a professional profile</h3>

          <div className="Company_name">
            <label htmlFor="Business Name" className="label">
              Business Name:
            </label>
            <input
              type="text"
              placeholder="B_Name"
              name="B_Name"
              value={BName}
              required
              readOnly
              className="input-field"
              onChange={handleChange}
            />
          </div>

          <div className="email">
            <label htmlFor="Email" className="label">
              Email:
            </label>
            <input
              type="email"
              placeholder="Email"
              name="Email"
              value={CEmail}
              readOnly
              required
              className="input-field"
              onChange={handleChange}
            />
          </div>

          <div className="dropdown-container">
            <label htmlFor="Service" className="label">
              Service:
            </label>
            <select
              id="Service"
              name="Service"
              className="dropdown"
              value={formData.Service}
              onChange={handleChange}
            >
              <option value="Brand Marketing">Brand Marketing</option>
              <option value="Event Management">Event Management</option>
              <option value="Interior Design">Interior Design</option>
              <option value="Movers and Packers">Movers and Packers</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Rentals">Rentals</option>
            </select>
          </div>
          { formData.Service === "Event Management" &&
            <>
              <label htmlFor="Service_Type" className="label">
                Service Type:
              </label>
              <select
                id="Service_Type"
                name="Service_Type"
                className="dropdown"
                value={formData.Service_Type}
                onChange={handleChange}
              >
                <option >Choose Service Type</option>
                <option value="Wedding Organizer">Wedding Organizer</option>
                <option value="StageShow Organizer">StageShow Organizer</option>
                <option value="Corporate Parties">Corporate Parties</option>
                <option value="Seminar Organizer">Seminar Organizer</option>
              </select>
            </>
          }

          { formData.Service === "Interior Design" &&
            <>
              <label htmlFor="Service_Type" className="label">
                Service Type:
              </label>
              <select
                id="Service_Type"
                name="Service_Type"
                className="dropdown"
                value={formData.Service_Type}
                onChange={handleChange}
              >
                <option>Choose Service Type</option>
                <option value="Architects">Architects</option>
                <option value="Interior Deceorators">Interior Deceorators</option>
                <option value="Interior Furnishing Constructors">Interior Furnishing Constructors</option>
              </select>
            </>
          }

          <div className="address-container">
            <label htmlFor="State" className="label">
              State:
            </label>
            <input
              type="text"
              placeholder="State"
              name="State"
              required
              className="input-field"
              onChange={handleChange}
            />

            <label htmlFor="City" className="label">
              City:
            </label>
            <input
              type="text"
              placeholder="City"
              name="City"
              value={City}
              required
              className="input-field"
              onChange={handleChange}
            />

            <label htmlFor="LocalAddress" className="label">
              Local Address:
            </label>
            <input
              type="text"
              placeholder="Local Address"
              name="Address"
              required
              className="input-field"
              onChange={handleChange}
            />
          </div>

          <label htmlFor="Service" className="label">
            Company_Link
          </label>
          <input
            type="text"
            placeholder="Company Link"
            name="C_Link"
            required
            className="input-field"
            onChange={handleChange}
          />

          <div className="time-container">
            <label htmlFor="OpeningTime" className="label">
              Opening Time:
            </label>
            <input
              type="time"
              name="O_Time"
              required
              className="input-field"
              onChange={handleChange}
            />
          </div>

          <div className="time-container">
            <label htmlFor="ClosingTime" className="label">
              Closing Time:
            </label>
            <input
              type="time"
              name="C_Time"
              required
              className="input-field"
              onChange={handleChange}
            />
          </div>

          <div className="established-year-container">
            <label htmlFor="EstablishedYear" className="label">
              Established Year:
            </label>
            <input
              type="text"
              placeholder="Established Year"
              name="E_Year"
              required
              className="input-field"
              onChange={handleChange}
            />
          </div>

          <div className="profile-pic-container">
            <label htmlFor="ProfilePicture" className="label">
              Profile Picture:
            </label>
            <input
              type="file"
              accept="image/*"
              name="ProfilePicture"
              className="input-field"
              onChange={handleImageChange}
            />
          </div>
          <button type="submit" className="submit-button">
              Submit
            </button>
          {/* <Link to="/home">
            <button type="submit" className="submit-button">
              Submit
            </button>
          </Link> */}
        </form>
      </div>
    </div>
  );
};

export default Company_Home;
