import React from 'react';
import ConnectButton from '../ConnectButton/ConnectButton';
import './Nav.css'

function Nav({ handleConnect, chainId, chainHex, chainName, rpcUrl }) {
  return (
    <header className="header">
      <nav className="nav">
        <div className="brand">
          <img src='./base.svg' className="logo" />
          <h3>Base Public Chat</h3>
        </div>

        <ul className='nav_link'>
          <li className='nav-text'><a href="/">Home</a></li>
          <li className='nav-text'><a href="https://basescan.org/address/0x86638bed40fb4a7cd9ef1666b5d5971f4964dd19">Contract</a></li>
          <li className='nav-text'><a href="https://warpcast.com/aichaindev">About</a></li>
        </ul>
        <div className="button-container">
            <ConnectButton
              onConnect={handleConnect}
              chainId={chainId}
              chainHex={chainHex}
              chainName={chainName}
              rpcUrl={rpcUrl}
            />
        </div>
      </nav>
    </header>
  );
}

export default Nav;