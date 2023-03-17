import React from "react";
import { useRef } from "react";

const ClothingCard = ({ card, onCardClick }) => {
  const ref = useRef(null);

  const backgroundImage = {
    backgroundImage: `url(${card.link})`,
  };

  React.useEffect(() => {
    ref.current.addEventListener("click", () => {
      onCardClick(card);
    });
  });

  return (
    <>
      <div className="card" ref={ref} style={backgroundImage}>
        <p className="card__name">{card.name}</p>
      </div>
    </>
  );
};

export default ClothingCard;
