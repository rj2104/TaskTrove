import React, { useState } from "react";
import { Modal, Button, Input } from "antd";

export default function ChatModal({ isVisible, onClose, company }) {
  const [message, setMessage] = useState("");

  const userDataString = localStorage.getItem("user");
  var currentUser;
  if (userDataString) {
    currentUser = JSON.parse(userDataString);
  }
  currentUser = currentUser.data.Email;
  console.log(currentUser)

  const handleSendMessage = () => {
    // Send the message to the backend
    fetch("http://localhost:3001/api/send-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ companyEmail: company.Email, user: currentUser, message }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Message sent successfully:", data.message);
          onClose(); // Close the modal after sending the message
        } else {
          console.error("Error sending message:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };
  
  return (
    <Modal
      title={`Send message to ${company.B_Name}`}
      visible={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
        <Button key="send" type="primary" onClick={handleSendMessage}>
          Send
        </Button>,
      ]}
    >
      <p>Email: {company.Email}</p>
      <Input.TextArea
        placeholder="Type your message here"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
    </Modal>
  );
}
