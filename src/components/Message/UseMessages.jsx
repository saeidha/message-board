import { useState } from 'react'; // Import necessary hook

const useMessages = (contract) => { // Define a custom hook

  const [messages, setMessages] = useState([]); // State to store messages

  const loadMessages = async () => { // Function to load messages
    if (!contract) return; // Check for contract existence before fetching
    const rawMessages = await contract.methods.getMessages().call();
    const formattedMessages = rawMessages.map((msg) => ({
      sender: msg.sender,
      text: msg.text,
      timestamp: Number(msg.timestamp),
    }));
    setMessages(formattedMessages.reverse());
  };

  return { messages, loadMessages }; // Return both messages and loadMessages function
};

export default useMessages; // Export the hook