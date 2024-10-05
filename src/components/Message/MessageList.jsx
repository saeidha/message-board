import React from 'react';
import MessageCard from './MessageCard'
const MessageList = ({ messages }) => {
  return (
    <div className="container">
      <p className="explorer">Explorer:</p>
      <div className="row">
        {messages.map((msg, index) => (
          <div className="col-md-4 custom-spacing" key={index}>
            <MessageCard sender={msg.sender} text={msg.text} timestamp={msg.timestamp} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageList;