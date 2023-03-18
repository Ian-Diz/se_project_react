import React from "react";
import closeIcon from "../images/Union.svg";

const PopupWithImage = ({ card, onClose, onOutClick }) => {
  return (
    <div
      className="popup__container popup_opened"
      id="imagePopup"
      onClick={onOutClick}
    >
      <div className="popup__photo">
        <img
          src={card.link}
          alt={`An image of ${card.name}`}
          className="popup__image"
        />
        <button type="button" className="popup__button" aria-label="Close">
          <img
            className="popup__close"
            alt="Close button image"
            src={closeIcon}
            id="imagePopup-close"
            onClick={onClose}
          />
        </button>
        <h2 className="popup__title">{card.name}</h2>
        <p className="popup__title popup__weather">Weather: {card.weather}</p>
      </div>
    </div>
  );
};

export default PopupWithImage;
