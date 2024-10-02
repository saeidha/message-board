import React from 'react';
import './Nav.css'


function Nav() {
  return (
    <header className="header">
      <nav className="nav">
        <div className="brand">
          <img src='./base.svg' className="logo" />
          <h3>Base Public Chat</h3>
        </div>

        <ul className='nav_link'>
          <li className='nav-text'><a href="/">Home</a></li>
          <li className='nav-text'><a href="/about">About</a></li>
          <li className='nav-text'><a href="https://basescan.org/address/0x86638bed40fb4a7cd9ef1666b5d5971f4964dd19">Contract</a></li>
        </ul>

        <div className="button-container">
          <button className="button">Button Text</button>
        </div>
      </nav>
    </header>
  );
}

export default Nav;