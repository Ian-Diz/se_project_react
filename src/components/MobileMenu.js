import React, { useContext } from "react";
import { Link } from "react-router-dom";
import closeIcon from "../images/mobileClose.svg";
import CurrentUserContext from "../contexts/CurrentUserContext";

const MobileMenu = ({
  onClose,
  handleClick,
  onOutClick,
  handleLogin,
  handleRegister,
  isLoggedIn,
}) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="menu" onClick={onOutClick}>
      <div className="menu__container">
        <button type="button" className="menu__button" aria-label="Close">
          <img
            className="menu__close"
            alt="Close button"
            src={closeIcon}
            onClick={onClose}
          />
        </button>
        {isLoggedIn ? (
          <>
            <button
              type="button"
              className="menu__add"
              onClick={handleClick}
              aria-label="Add"
            >
              + Add clothes
            </button>
            <Link to="/profile" className="menu__link" onClick={onClose}>
              <p className="menu__name">{currentUser.data.name}</p>
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
          <div className="menu__outlogged">
            <button className="menu__sign" onClick={handleRegister}>
              Sign Up
            </button>
            <button className="menu__log" onClick={handleLogin}>
              Log In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
