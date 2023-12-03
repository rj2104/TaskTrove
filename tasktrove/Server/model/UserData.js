const mongoose = require("mongoose");

const User = new mongoose.Schema({
    FirstName:String,
    LastName: String,
    Email: String,
    Password:String,
});

const UserModal = mongoose.model("users",User);
module.exports = UserModal;