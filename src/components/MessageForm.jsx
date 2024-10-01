import React from 'react';
import { TextField, Button } from '@mui/material';

const MessageForm = ({ sendMessage, message, setMessage }) => {
  return (
    <form onSubmit={sendMessage} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <TextField
        variant="outlined"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
        required
        fullWidth
        InputProps={{
          style: {
            borderRadius: '10px', // Set corner radius here
            backgroundColor: '#fff', // Optional: set background color
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        style={{
          borderRadius: '10px', // Set corner radius here
          height: '4em',
          width: '12em',
          color: '#fff',
          fontWeight: 'bold'
        }}
      >
        Send
      </Button>
    </form>
  );
};

export default MessageForm;
