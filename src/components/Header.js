import React from 'react';
import { Link } from 'react-router-dom';
import { BsEmojiSunglasses } from 'react-icons/bs';

const Header = () => {
  return (
    <header className="header">
      <Link className="header-link" to="/">
        <span>
          <BsEmojiSunglasses className="logo-icon" />
        </span>
        <span>WeatherBolts</span>
      </Link>
    </header>
  );
};

export default Header;
