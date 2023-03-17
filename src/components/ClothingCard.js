import React from "react";
import { useRef } from "react";

const ClothingCard = ({ card, onCardClick }) => {
  const test = useRef(null);

  const backgroundImage = {
    backgroundImage: `url(${card.link})`,
  };

  React.useEffect(() => {
    test.current.addEventListener("click", onCardClick);
    return () => {
      test.current.removeEventListener("click", onCardClick);
    };
  }, []);

  return (
    <>
      <div className="card" ref={test} style={backgroundImage}>
        <p className="card__name">{card.name}</p>
      </div>
    </>
  );
};

export default ClothingCard;
