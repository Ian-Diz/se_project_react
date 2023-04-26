import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

const SideBar = ({ isLoggedIn, editClick, logoutClick }) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <div className="profile__sidebar">
        {isLoggedIn ? (
          <div className="profile__info">
            {currentUser.data.avatar ? (
              <img
                className="profile__avatar"
                src={currentUser.data.avatar}
                alt="User avatar"
              />
            ) : (
              <p className="profile__letter">{currentUser.data.name[0]}</p>
            )}
            <p className="profile__name">{currentUser.data.name}</p>
          </div>
        ) : null}
        <button className="profile__edit profile__button" onClick={editClick}>
          Change profile data
        </button>
        <button
          className="profile__logout profile__button"
          onClick={logoutClick}
        >
          Log out
        </button>
      </div>
    </>
  );
};

export default SideBar;
