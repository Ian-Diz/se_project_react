import ClothesSection from "./ClothesSection";
import SideBar from "./Sidebar";

const Profile = ({ cards, onCardClick, onAddClick }) => {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection
        cards={cards}
        onCardClick={onCardClick}
        onAddClick={onAddClick}
      />
    </section>
  );
};

export default Profile;
