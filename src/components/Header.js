import React, { useContext } from "react";
import logo from "../images/wtwrlogo.svg";
import burger from "../images/hamburgor.svg";
import Switch from "./TempSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";

const Header = ({
  weatherData,
  handleClick,
  handleMobile,
  handleLogin,
  handleRegister,
  isLoggedIn,
}) => {
  const currentUser = useContext(CurrentUserContext);

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
        {isLoggedIn ? (
          <>
            <button
              type="button"
              className="header__add"
              onClick={handleClick}
              aria-label="Add"
            >
              + Add clothes
            </button>
            <Link to="/profile" className="header__link">
              <p className="header__name">{currentUser.data.name}</p>
              {currentUser.data.avatar ? (
                <img
                  className="header__avatar"
                  src={currentUser.data.avatar}
                  alt="User avatar"
                />
              ) : (
                <p className="header__letter">{currentUser.data.name[0]}</p>
              )}
            </Link>
          </>
        ) : (
          <div className="header__outlogged">
            <button className="header__sign" onClick={handleRegister}>
              Sign Up
            </button>
            <button className="header__log" onClick={handleLogin}>
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
