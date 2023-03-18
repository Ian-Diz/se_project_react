import React from "react";

const ClothingCard = ({ card, onCardClick }) => {
  const cardStyle = {
    backgroundImage: `url(${card.link})`,
  };

  const onClick = () => {
    onCardClick(card);
  };

  return (
    <div className="card" onClick={onClick} style={cardStyle}>
      <p className="card__name">{card.name}</p>
    </div>
  );
};

export default ClothingCard;
