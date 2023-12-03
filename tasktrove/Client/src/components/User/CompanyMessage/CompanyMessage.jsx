import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import CompanyHeader from '../header/HeaderCompany';
import "./CompanyMessage.css";

function CompanyMessage() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const userDataString = localStorage.getItem('user');
  var companyEmail;
  if (userDataString) {
    companyEmail = JSON.parse(userDataString);
  }
  companyEmail = companyEmail.data.Email;

  useEffect(() => {
    // Fetch messages for the currently logged-in company
    fetch(`http://localhost:3001/api/get-company-messages?companyEmail=${companyEmail}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setMessages(data.messages);
        } else {
          console.error('Error fetching messages:', data.error);
        }
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });
  }, [companyEmail]);

  const showModal = (message) => {
    setSelectedMessage(message);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <CompanyHeader />
      {/* <h1>Messages</h1> */}
      <ul>
        {messages.map((message) => (
          <li key={message._id} onClick={() => showModal(message)}>
            {/* <p>User: {message.user}</p> */}

            <div className="unique-card">
          <div className="background-overlay"></div>
          <div className="card-content">
            <div className="card-title">{message.user}</div>
            <div className="card-description">Click to show message.</div>
          </div>
        </div>

            {/* Display only part of the message for brevity */}
            {/* <p>Message: {message.message.substring(0, 50)}...</p> */}
          </li>
        ))}
      </ul>

      {selectedMessage && (
        <Modal className="modal_class" visible={isModalVisible} onCancel={handleCancel} footer={null}>
          <h2><strong>User Email:</strong> {selectedMessage.user}</h2>
          <p><strong>Full Message:</strong></p>
          {/* <br /> */}
          <div className="message-lines">
            {selectedMessage.message.split('.').map((sentence, index, array) => (
               <p key={index}>{sentence.trim()}{index < array.length - 1 ? '.' : ''}</p>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CompanyMessage;
