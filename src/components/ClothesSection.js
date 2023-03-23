import ClothingCard from "./ClothingCard";

const ClothesSection = ({ cards, onCardClick, onAddClick }) => {
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
        {cards.map((card) => (
          <ClothingCard key={card.id} card={card} onCardClick={onCardClick} />
        ))}
      </ul>
    </div>
  );
};

export default ClothesSection;
