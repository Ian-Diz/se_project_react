import React, { useContext } from "react";
import closeIcon from "../images/Union.svg";
import CurrentUserContext from "../contexts/CurrentUserContext";

const PopupWithImage = ({ card, onClose, onOutClick, onDeleteClick }) => {
  const currentUser = useContext(CurrentUserContext);

  const isOwn =
    card.owner === (currentUser.data === undefined ? "" : currentUser.data._id);

  return (
    <div className="popup__container-image" onClick={onOutClick}>
      <div className="popup__photo">
        <img
          src={card.imageUrl}
          alt={`${card.name}`}
          className="popup__image"
        />
        <button type="button" className="popup__button" aria-label="Close">
          <img
            className="popup__close"
            alt="Close button"
            src={closeIcon}
            id="imagePopup-close"
            onClick={onClose}
          />
        </button>
        <div className="popup__subcontainer">
          <div>
            <h2 className="popup__title">{card.name}</h2>
            <p className="popup__title popup__weather">
              Weather: {card.weather}
            </p>
          </div>
          {isOwn ? (
            <button
              className="popup__delete"
              onClick={onDeleteClick}
              aria-label="Delete"
            >
              Delete Item
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PopupWithImage;
