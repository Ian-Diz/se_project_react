import React from "react";
import { useRef } from "react";
import logo from "../images/wtwrlogo.svg";
import avatar from "../images/avatar.jpeg";

const Header = ({ weatherData, handleClick }) => {
  const add = useRef(null);

  React.useEffect(() => {
    add.current.addEventListener("click", handleClick);
  });

  if (!weatherData) return null;

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <header className="header">
        <div className="header__left">
          <img className="header__logo" src={logo} alt="WTWR logo" />
          <p className="header__date">
            {currentDate}, {weatherData.city}
          </p>
        </div>
        <div className="header__right">
          <p className="header__add" ref={add}>
            + Add clothes
          </p>
          <p className="header__name">Ian Dizney</p>
          <img className="header__avatar" src={avatar} alt="User avatar" />
        </div>
      </header>
    </>
  );
};

export default Header;
