import React, { useEffect, useState } from 'react'
import Web3 from 'web3';
import MessageCard from './components/MessageCard'
import MessageForm from './components/MessageForm'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

const contractAddress = '0x86638bed40fb4a7cd9ef1666b5d5971f4964dd19';
const contractABI = [
  {
      "inputs": [
          {
              "internalType": "string",
              "name": "_text",
              "type": "string"
          }
      ],
      "name": "sendMessage",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "getMessages",
      "outputs": [
          {
              "components": [
                  {
                      "internalType": "address",
                      "name": "sender",
                      "type": "address"
                  },
                  {
                      "internalType": "string",
                      "name": "text",
                      "type": "string"
                  },
                  {
                      "internalType": "uint256",
                      "name": "timestamp",
                      "type": "uint256"
                  }
              ],
              "internalType": "struct MessageBoard.Message[]",
              "name": "",
              "type": "tuple[]"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "sender",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "string",
              "name": "text",
              "type": "string"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
          }
      ],
      "name": "NewMessage",
      "type": "event"
  }
];

const CHAIN_ID = 8453;
const CHAIN_HEX = '0x2105';
const CHAIN_NAME = 'Base';
const RPC_URL = 'https://mainnet.base.org';


function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
      const loadWeb3 = async () => {
          if (window.ethereum) {
              window.web3 = new Web3(window.ethereum);
              try {
                  await window.ethereum.request({ method: 'eth_requestAccounts' });
                  const networkId = await window.web3.eth.net.getId();

                  if (networkId !== CHAIN_ID){ 
                      switchNetwork();
                  }
                  loadBlockchainData();
              } catch (error) {
                  console.error("User denied account access or there's an error");
              }
          } else {
              const provider = new Web3.providers.HttpProvider(RPC_URL);
              window.web3 = new Web3(provider);
              loadBlockchainData();
          }
      };

      loadWeb3();
  }, []);

  const switchNetwork = async () => {
      if (window.ethereum) {
          try {
              await window.ethereum.request({
                  method: 'wallet_switchEthereumChain',
                  params: [{ chainId: CHAIN_HEX }]
              });
          } catch (switchError) {
              if (switchError.code === 4902) {
                  try {
                      await window.ethereum.request({
                          method: 'wallet_addEthereumChain',
                          params: [
                              {
                                  chainId: CHAIN_HEX,
                                  chainName: CHAIN_NAME,
                                  rpcUrls: [RPC_URL]
                              }
                          ]
                      });
                  } catch (addError) {
                      console.error(addError);
                  }
              }
          }
      }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    const contract = new web3.eth.Contract(contractABI, contractAddress);
    setContract(contract);

    const rawMessages = await contract.methods.getMessages().call();
    const messages = rawMessages.map(msg => ({
        sender: msg.sender,
        text: msg.text,
        timestamp: Number(msg.timestamp)
    }));
    setMessages(messages);
};


  const connectWallet = async () => {
      if (window.ethereum) {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const networkId = await window.web3.eth.net.getId();
          if (networkId !== CHAIN_ID) { // Sepolia network ID
              switchNetwork();
          }
          // loadBlockchainData();
      } else {
          alert('Please install MetaMask!');
      }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === '') return;

    try {
        await contract.methods.sendMessage(message).send({ from: account });

        const rawMessages = await contract.methods.getMessages().call();
        const messages = rawMessages.map(msg => ({
            sender: msg.sender,
            text: msg.text,
            timestamp: Number(msg.timestamp)
        }));
        setMessages(messages);
        setMessage('');
    } catch (error) {
        console.error("Error sending message:", error);
    }
};
      
    return (
      <div className="App">
          <div className="container">
              <h1>Base Public Chat</h1>
              {account ? (
                  <p>Connected as: {account}</p>
              ) : (
                  <button onClick={connectWallet}>Connect Wallet</button>
              )}
              {account && (
                  <>
                       <MessageForm sendMessage={sendMessage} message={message} setMessage={setMessage} />
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
                  </>
              )}
          </div>
      </div>
  );
}

export default App;
