import React from 'react';
import LogoDuck from '../images/logo.png';
import './styles/Logo.css';

function Logo({ title }) {
  return (
    <div className="logo">
      <div className="logo__container">
        <img className="logo__image" src={LogoDuck} alt="CryptoDucks logo"/>
        {title && <p className="logo__title">{title}</p>}
      </div>
    </div>
  );
}
export default Logo;
