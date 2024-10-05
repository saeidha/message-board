import React, { useState } from 'react';

const ConnectButton = ({ onConnect, chainId, chainHex, chainName, rpcUrl }) => {
    const [connecting, setConnecting] = useState(false);
    const [connectedAccount, setConnectedAccount] = useState('');

    const formatAccount = (account) => {
        return `${account.slice(0, 4)}...${account.slice(-4)}`;
    };

    const connectWallet = async () => {
        setConnecting(true);
        try {
            if (window.ethereum) {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const networkId = await window.web3.eth.net.getId();
                if (networkId !== chainId) {
                    switchNetwork();
                }
                const accounts = await web3.eth.getAccounts();
                setConnectedAccount(accounts[0]);
                onConnect(accounts[0]); // Pass the connected account to the parent component
            } else {
                alert('Please install MetaMask!');
            }
        } catch (error) {
            console.error('Error connecting wallet:', error);
        } finally {
            setConnecting(false);
        }
    };

    const switchNetwork = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: chainHex }]
                });
            } catch (switchError) {
                if (switchError.code === 4902) {
                    try {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainId: chainHex,
                                    chainName: chainName,
                                    rpcUrls: [rpcUrl]
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

    return (
        <button onClick={connectWallet} disabled={connecting}>
            {connecting ? 'Connecting...' : connectedAccount ? `Connected: ${formatAccount(connectedAccount)}` : 'Connect Wallet'}
        </button>
    );
};

export default ConnectButton;
