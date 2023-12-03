import React from "react";
import "./GrowBusiness.css";
import { AiOutlineDoubleRight } from "react-icons/ai";
import img1 from "../../../../assets/img1.png";
import img2 from "../../../../assets/img2.png";
import img3 from "../../../../assets/img3.png";

const GrowBusiness = () => {
  return (
    <div className="business_grow_main">
      <div className="bg_tag_line">
        Get a FREE Business Listing in 3 Simple Steps
      </div>
      <div className="bg_list_section">
        <div className="bg_list_item">
          <img src={img1} alt="" />
          <span>Step 1</span>
          <div className="step_title">Create Account</div>
          <div className="step_detail">
            Enter your company name and city to get started 
          </div>
        </div>
        <AiOutlineDoubleRight className="arrow_right" />
        <div className="bg_list_item">
          <img src={img2} alt="" />
          <span>Step 2</span>
          <div className="step_title">Enter Business Details</div>
          <div className="step_detail">
            Add name, address, business hours and photos
          </div>
        </div>
        <AiOutlineDoubleRight className="arrow_right" />

        <div className="bg_list_item">
          <img src={img3} alt="" />
          <span>Step 3</span>
          <div className="step_title">Select Categories </div>
          <div className="step_detail">
            Add relevant categories to your free listing page
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowBusiness;
