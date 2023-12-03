import React, { useEffect, useState } from 'react';
import User_company from "../user_company";
import "../user_company.css";
import axios from 'axios';
import Header from '../header/Header';


const Rentals = () => {

    const [Records, setRecords] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        axios
          .get(`http://localhost:3001/get-companies/${"Rentals"}`)
          .then((response) => {
            setRecords(response.data);
          })
          .catch((error) => {
            console.error('Error fetching companies:', error);
          });
      }, [Records]); 

  return (
    <>
    <Header/>
    <div className='branding-container'>
        <h1>Rental Property</h1>
        {Records.map((company) => (
            <User_company company={company}/>
        ))}
    </div>
    </>
  )
}

export default Rentals