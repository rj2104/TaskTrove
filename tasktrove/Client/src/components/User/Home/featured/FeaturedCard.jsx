import React, { useEffect, useState } from "react";
import { featured } from "../../../data/Data";
import "./Featured.css";
import { Link } from "react-router-dom";
import axios from "axios";
const FeaturedCard = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [serviceCounts, setServiceCounts] = useState({
    'Brand Marketing': 0,
    'Event Management': 0,
    'Movers and Packers': 0,
    'Interior Design': 0,
    'Real Estate': 0,
    'Rentals':0
  });

  useEffect(() => {
    axios
      .get('http://localhost:3001/get-companies')
      .then((response) => {
        const data = response.data;
        // Count the number of users for each service
        const counts = {
          'Brand Marketing': data.filter(user => user.Service === 'Brand Marketing').length,
          'Event Management': data.filter(user => user.Service === 'Event Management').length,
          'Movers and Packers': data.filter(user => user.Service === 'Movers and Packers').length,
          'Interior Design': data.filter(user => user.Service === 'Interior Design').length,
          'Real Estate': data.filter(user => user.Service === 'Real Estate').length,
          'Rentals': data.filter(user => user.Service === 'Rentals').length,
        };

        setServiceCounts(counts);
      })
      .catch((error) => {
        console.error('Error fetching companies:', error);
      });
  }, []);


  return (
    <>
      <div className="content grid5 mtop">
      {featured.map((items, index) => (
        <Link to={items.link}>
        <div className="box" key={index}>
          <img src={require(`../../../../assets/${items.cover}`)} alt="" />
          <h4>{items.name}</h4>
          <div className="service_count">
            <h4>{serviceCounts[items.name]}</h4>
            <label><b>{items.total}</b></label>
          </div>
        </div>
        </Link>

      ))}
      </div>
    </>
  );
};

export default FeaturedCard;
