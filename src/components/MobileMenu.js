import { Link } from "react-router-dom";
import avatar from "../images/avatar.jpeg";
import closeIcon from "../images/mobileClose.svg";

const MobileMenu = ({ onClose, handleClick }) => {
  return (
    <div className="menu">
      <button type="button" className="menu__button" aria-label="Close">
        <img
          className="menu__close"
          alt="Close button image"
          src={closeIcon}
          onClick={onClose}
        />
      </button>
      <Link to="/profile" className="menu__link" onClick={onClose}>
        <p className="menu__name">Ian Dizney</p>
        <img className="menu__avatar" src={avatar} alt="User avatar" />
      </Link>
      <button
        type="button"
        className="menu__add"
        onClick={handleClick}
        aria-label="Add"
      >
        + Add clothes
      </button>
    </div>
  );
};

export default MobileMenu;
