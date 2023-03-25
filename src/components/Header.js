import React from "react";
import logo from "../images/wtwrlogo.svg";
import avatar from "../images/avatar.jpeg";
import burger from "../images/hamburgor.svg";
import Switch from "./TempSwitch";
import { Link } from "react-router-dom";

const Header = ({ weatherData, handleClick, handleMobile }) => {
  if (!weatherData) return null;

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <img className="header__logo" src={logo} alt="WTWR logo" />
        </Link>
        <p className="header__date">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <button
        type="button"
        aria-label="mobile menu"
        className="header__button"
        onClick={handleMobile}
      >
        <img src={burger} className="header__burger" alt="Hamburger menu" />
      </button>
      <div className="header__right">
        <Switch />
        <button
          type="button"
          className="header__add"
          onClick={handleClick}
          aria-label="Add"
        >
          + Add clothes
        </button>
        <Link to="/profile" className="header__link">
          <p className="header__name">Ian Dizney</p>

          <img className="header__avatar" src={avatar} alt="User avatar" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
