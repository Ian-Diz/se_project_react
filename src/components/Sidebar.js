import avatar from "../images/avatar.jpeg";

const SideBar = () => {
  return (
    <div className="profile__info">
      <img className="profile__avatar" src={avatar} alt="User avatar" />
      <p className="profile__name">Ian Dizney</p>
    </div>
  );
};

export default SideBar;
