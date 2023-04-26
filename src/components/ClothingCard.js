import React, { useContext } from "react";
import heart from "../images/heart.svg";
import filledHeart from "../images/filledHeart.svg";
import CurrentUserContext from "../contexts/CurrentUserContext";

const ClothingCard = ({ card, onCardClick, onLike, isLoggedIn }) => {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = card.likes.some((user) => user._id === currentUser._id);

  const handleLike = () => {
    onLike(card._id, isLiked, currentUser);
  };

  const onClick = () => {
    onCardClick(card);
  };

  return (
    <div className="card">
      <img
        src={card.imageUrl}
        alt={`${card.name}`}
        className="card__image"
        onClick={onClick}
      />
      <div className="card__container">
        <p className="card__name">{card.name}</p>
        {isLoggedIn ? (
          <img
            src={isLiked ? filledHeart : heart}
            alt="like button"
            className="card__like"
            onClick={handleLike}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ClothingCard;
