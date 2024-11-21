import React from 'react';
import './Footer.css';
import { getFooterCopy, getFullYear } from '../utils/utils';
import { AppContext } from '../App/AppContext';

export default function Footer() {
  const { user } = React.useContext(AppContext);
  return (
    <>
      <div className="App-footer">
        {user.isLoggedIn && <a href='#'>Contact us</a>}
        <p>Copyright {getFullYear()} - {getFooterCopy()}</p>
        </div>
    </>
  );
}
