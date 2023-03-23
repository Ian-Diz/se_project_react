import ClothingCard from "./ClothingCard";
import avatar from "../images/avatar.jpeg";

const Profile = ({ cards, onCardClick }) => {
  return (
    <section className="profile">
      <div className="profile__info">
        <img className="profile__avatar" src={avatar} alt="User avatar" />
        <p className="profile__name">Ian Dizney</p>
      </div>
      <div className="profile__container">
        <div className="profile__subcontainer">
          <p className="profile__title">Your items</p>
          <p className="profile__add">+ Add New</p>
        </div>
        <ul className="profile__cards">
          {cards.map((card) => (
            <ClothingCard key={card.id} card={card} onCardClick={onCardClick} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Profile;
