import ClothesSection from "./ClothesSection";
import SideBar from "./Sidebar";

const Profile = ({
  cards,
  onCardClick,
  onAddClick,
  isLoggedIn,
  editClick,
  logoutClick,
  onLike,
}) => {
  return (
    <section className="profile">
      <div className="profile__content">
        <SideBar
          isLoggedIn={isLoggedIn}
          editClick={editClick}
          logoutClick={logoutClick}
        />
        <ClothesSection
          cards={cards}
          onCardClick={onCardClick}
          onAddClick={onAddClick}
          isLoggedIn={isLoggedIn}
          onLike={onLike}
        />
      </div>
    </section>
  );
};

export default Profile;
