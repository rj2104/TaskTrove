import React, { useEffect, useState } from "react";
import img from "./services.jpg";
import Back from "../../Back";
import "../Home/featured/Featured";
import FeaturedCard from "../Home/featured/FeaturedCard";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Heading from "../../Heading";
import "./hero1.css";
import citiesData from "../../data/citiesData";
import User_company from "../user_company";
import axios from "axios";


// ... (previous imports)

const Services = () => {
  const [Records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [selectedServiceType, setSelectedServiceType] = useState("");

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

  console.log(Records.length)

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSelectedCity(""); // Reset selected city when state changes
    setSelectedPropertyType(""); // Reset selected property type when state changes
  };

	const cities = citiesData[selectedState] || [];

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handlePropertyTypeChange = (event) => {
    setSelectedPropertyType(event.target.value);
  };

  const handleServiceTypeChange = (event) => {
    setSelectedServiceType(event.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let filteredResults = Records;
    
    if (selectedState && selectedCity && selectedPropertyType && selectedServiceType ) {
      filteredResults = filteredResults.filter(
        (record) =>
          record.State === selectedState &&
          record.City === selectedCity &&
          record.Service === selectedPropertyType &&
          record.Service_Type === selectedServiceType
      );
    }else if (selectedState && selectedCity && selectedPropertyType) {
      filteredResults = filteredResults.filter(
        (record) =>
          record.State === selectedState &&
          record.City === selectedCity &&
          record.Service === selectedPropertyType
      );
    } else if (selectedState && selectedCity) {
      filteredResults = filteredResults.filter(
        (record) => record.State === selectedState && record.City === selectedCity
      );
    } else if(selectedPropertyType && selectedServiceType) {
      filteredResults = filteredResults.filter(
        (record) => record.Service === selectedPropertyType && 
        record.Service_Type === selectedServiceType
      );
    } else if (selectedPropertyType) {
      filteredResults = filteredResults.filter(
        (record) => record.Service === selectedPropertyType
      );
    }

    setFilteredRecords(filteredResults);
	// setFilteredRecords(filteredResults.length > 0 ? filteredResults : Records);
  };

  

  return (
    <>
      <Header />
      <section className="hero1">
        <Back name="Services" title="Services -All Services" cover={img} />
        <div className="container">
          <form className="flex1">
            <div className="box1">
              <span>State</span>
              <select
                id="state"
                className="dropdown"
                onChange={handleStateChange}
                value={selectedState}
              >
                <option value="">Select a state</option>
                {Object.keys(citiesData).map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>{" "}
            </div>

            <div className="box1">
              <span>City</span>
              <select
                id="city"
                className="dropdown"
                onChange={handleCityChange}
                value={selectedCity}
              >
                <option value="">Select a city</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>{" "}
            </div>

            <div className="box1">
              <span>Property Type</span>
              {/* <input type='text' placeholder='Service Type' /> */}
              <select
                id="Service"
                name="Service"
                className="dropdown"
                onChange={handlePropertyTypeChange}
                value={selectedPropertyType}
              >
                <option value="">Service Type</option>
                <option>Brand Marketing</option>
                <option>Event Management</option>
                <option>Interior Design</option>
                <option>Movers and Packers</option>
                <option>Real Estate</option>
                <option>Rentals</option>
              </select>
            </div>
            { (selectedPropertyType !== "Event Management" && selectedPropertyType !== "Interior Design"&& selectedServiceType !== "" ) &&
                setSelectedServiceType("")
            }
            { selectedPropertyType === "Event Management" &&
            <div className="box1">
              <span>Service Type</span>
              <select
                id="Service_Type"
                name="Service_Type"
                className="dropdown"
                value={selectedServiceType}
                onChange={handleServiceTypeChange}
              >
                <option >Choose Service Type</option>
                <option value="Wedding Organizer">Wedding Organizer</option>
                <option value="StageShow Organizer">StageShow Organizer</option>
                <option value="Corporate Parties">Corporate Parties</option>
                <option value="Seminar Organizer">Seminar Organizer</option>
              </select>
            </div>
          }

          { selectedPropertyType === "Interior Design" &&
            <div className="box1">
              <span>Service Type</span>
              <select
                id="Service_Type"
                name="Service_Type"
                className="dropdown"
                value={selectedServiceType}
                onChange={handleServiceTypeChange}
              >
                <option>Choose Service Type</option>
                <option value="Architects">Architects</option>
                <option value="Interior Deceorators">Interior Deceorators</option>
                <option value="Interior Furnishing Constructors">Interior Furnishing Constructors</option>
              </select>
            </div>
          }

        <button className="btn1" onClick={handleSearch}>
          <i className="fa fa-search"></i>
        </button>
	</form>
	</div>
      </section>
      <div className="Company-cards">
          {console.log(filteredRecords)}
        {filteredRecords.map((company) => (
          <User_company company={company} key={company.id} email={company.Email}/>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Services;

