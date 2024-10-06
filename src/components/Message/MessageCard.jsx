import React from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css'
import './MessageCard.css'

const MessageCard = ({ sender, text, timestamp }) => {
  const date = new Date(timestamp * 1000)
  const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  return (
    <Card className="custom-card">
      <Card.Header className="custom-card-header">
        <p className='address-text'>Sender: {sender.slice(0, 4)}...${sender.slice(-4)}</p>
        <p className="formatted-date"> Date: {formattedDate}</p>
      </Card.Header>
      <Card.Body>
        <Card.Text>
        <h2> {text} </h2>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MessageCard;