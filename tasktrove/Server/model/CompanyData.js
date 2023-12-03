const mongoose = require("mongoose");

const Company = new mongoose.Schema({
    Name:String,
    Email: String,
    City:String,
    Password:String,
});

const CompanyModal = mongoose.model("company",Company);
module.exports = CompanyModal;