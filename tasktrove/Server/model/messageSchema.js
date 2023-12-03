// Import required modules
const mongoose = require("mongoose");

// Define the message schema
const messageSchema = new mongoose.Schema({
  companyEmail: String,
  user: String,
  message: String,
});

// Create the Message model
const Message = mongoose.model("Message", messageSchema);

// Export the Message model
module.exports = Message;
