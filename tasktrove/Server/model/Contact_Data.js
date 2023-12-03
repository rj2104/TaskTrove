const mongoose = require("mongoose");

const Contact = new mongoose.Schema({
    Name:String,
    Email: String,
    Subject: String,
    Description: String,
});

const ContactModal = mongoose.model("contact",Contact);
module.exports = ContactModal;