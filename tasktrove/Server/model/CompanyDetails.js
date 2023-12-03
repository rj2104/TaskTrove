const mongoose = require("mongoose");

const CompanyDetails = new mongoose.Schema({
    B_Name:String,
    Email: String,
    Service: String,
    Service_Type: String,
    State:String,
    City:String,
    Address:String,
    C_Link:String,
    O_Time:String,
    C_Time:String,
    E_Year:String,
    ProfilePicture:String,
});

const CompanyDetailsModal = mongoose.model("company_details",CompanyDetails);
module.exports = CompanyDetailsModal;