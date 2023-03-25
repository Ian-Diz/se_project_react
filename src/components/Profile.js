import ClothesSection from "./ClothesSection";
import SideBar from "./Sidebar";

const Profile = ({ cards, onCardClick, onAddClick }) => {
  return (
    <section className="profile">
      <div className="profile__content">
        <SideBar />
        <ClothesSection
          cards={cards}
          onCardClick={onCardClick}
          onAddClick={onAddClick}
        />
      </div>
    </section>
  );
};

export default Profile;
