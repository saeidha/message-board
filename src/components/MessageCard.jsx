import React from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css'
import './MessageCard.css'

const MessageCard = ({ sender, text, timestamp }) => {
  const formattedDate = new Date(timestamp * 1000).toLocaleString();
  return (
    <Card className="custom-card">
      <Card.Header className="custom-card-header">
        <strong>{sender}</strong>
        <h4>({formattedDate})</h4>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          {text}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MessageCard;