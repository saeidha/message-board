import React, { useEffect, useState } from 'react'
import Web3 from 'web3';
import MessageForm from './components/Message/MessageForm'
import Nav from './components/Nav/Nav'
import ConnectButton from './components/ConnectButton/ConnectButton'
import MessageList from './components/Message/MessageList'
import useMessages from './components/Message/UseMessages';
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
    const { messages, loadMessages } = useMessages(contract);

    useEffect(() => {
        loadWeb3();
        loadContract();
        loadMessages();
    }, [loadMessages]);

    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
        } else {
            const provider = new Web3.providers.HttpProvider(RPC_URL);
            window.web3 = new Web3(provider);
        }
    };

    const loadContract = async () => {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const contract = new web3.eth.Contract(contractABI, contractAddress);
        setContract(contract);
    };


    const handleConnect = (connectedAccount) => {
        setAccount(connectedAccount);
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
            <Nav />
            <div className="container-box">
                {account ? (
                    <p>Connected as: {account}</p>
                ) : (
                    <ConnectButton onConnect={handleConnect} chainId={CHAIN_ID} chainHex={CHAIN_HEX} chainName={CHAIN_NAME} rpcUrl={RPC_URL} />
                )}
                {account && (
                    <>
                        <MessageForm sendMessage={sendMessage} message={message} setMessage={setMessage} />
                    </>
                )}
            </div>
            <MessageList messages={messages} loadMessages={loadMessages} />
        </div>
    );
}

export default App;
