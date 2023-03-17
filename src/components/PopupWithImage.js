import React from "react";
import { useRef } from "react";
import closeIcon from "../images/Union.svg";

const PopupWithImage = ({ card, onClose }) => {
  const exit = useRef(null);
  const popup = useRef(null);

  React.useEffect(() => {
    window.addEventListener("keydown", onClose);
    exit.current.addEventListener("click", onClose);
    popup.current.addEventListener("mousedown", onClose);

    return () => {
      window.removeEventListener("keydown", onClose);
    };
  });
  return (
    <>
      <div
        className="popup__container popup_opened"
        id="imagePopup"
        ref={popup}
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
              ref={exit}
            />
          </button>
          <h2 className="popup__title">{card.name}</h2>
          <p className="popup__title popup__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </>
  );
};

export default PopupWithImage;
