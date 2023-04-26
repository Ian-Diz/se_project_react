import React, { useContext } from "react";
import ClothingCard from "./ClothingCard";
import CurrentUserContext from "../contexts/CurrentUserContext";

const ClothesSection = ({
  cards,
  onCardClick,
  onAddClick,
  isLoggedIn,
  onLike,
}) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="profile__container">
      <div className="profile__subcontainer">
        <p className="profile__title">Your items</p>
        <button
          type="button"
          className="profile__add"
          aria-label="Add"
          onClick={onAddClick}
        >
          + Add New
        </button>
      </div>
      <ul className="profile__cards">
        {cards
          .filter(
            (card) =>
              card.owner ===
              (currentUser.data === undefined ? "" : currentUser.data._id)
          )
          .map((card) => (
            <ClothingCard
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onLike={onLike}
              isLoggedIn={isLoggedIn}
            />
          ))}
      </ul>
    </div>
  );
};

export default ClothesSection;
