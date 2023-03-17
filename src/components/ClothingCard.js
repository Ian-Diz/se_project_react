import React from "react";

const ClothingCard = ({ card, onCardClick }) => {
  const backgroundImage = {
    backgroundImage: `url(${card.link})`,
  };

  React.useEffect(() => {
    ?.addEventListener("click", onCardClick);
    return () => {
      element.removeEventListener("click", onCardClick);
    };
  }, []);

  return (
    <>
      <div className="card" style={backgroundImage}>
        <p className="card__name">{card.name}</p>
      </div>
    </>
  );
};

export default ClothingCard;
