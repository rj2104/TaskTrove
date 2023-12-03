import React from "react";
import "./Growth.css";
import img4 from "../../../../assets/img4.png";
const Growth = () => {
  return (
    <div className="business_grow_main">
      <div className="bg_tag_line1">
      Connect with New Customers & Grow Your Business
      </div>
      <div className="bg_list_section1">
        <div className="bg_list_item1">
          <img src={img4} alt="" />
        </div>
        <ol className="bg_list_item1">
          <div className="step_title">Steps: </div>
          <li className="step_detail">Start by registering your company on Tasktrove, showcasing your expertise and services.</li>
          <li className="step_detail">Clearly outline the specific services your company offers within the defined parameters.</li>
          <li className="step_detail">Set your location preferences to ensure that your services are visible to users in relevant areas.></li>
          <li className="step_detail">Utilize call and chat options to facilitate efficient communication with users interested in your services.></li>
          <li className="step_detail">Respond promptly to user inquiries and address their tasks or services efficiently.></li>
        </ol>
      </div>
    </div>
  );
};

export default Growth;
