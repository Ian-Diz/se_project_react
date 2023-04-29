import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithImage from "./PopupWithImage";
import { getWeather, filterData, getWeatherBanner } from "../utils/weatherApi";
import { apiKey, latitude, longitude } from "../utils/constants";
import CurrentTempUnitContext from "../contexts/CurrentTempUnitContext";
import { Route, useHistory } from "react-router-dom";
import Profile from "./Profile";
import AddItemPopup from "./AddItemPopup";
import PopupWithConfirmation from "./PopupWithConfirmation";
import {
  addClothing,
  deleteCard,
  getClothing,
  addLike,
  removeLike,
  editProfile,
} from "../utils/api";
import MobileMenu from "./MobileMenu";
import LoginPopup from "./LoginPopup";
import RegisterPopup from "./RegisterPopup";
import * as auth from "../utils/auth";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditPopup from "./EditPopup";
import LogoutPopup from "./LogoutPopup";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  const [weatherData, setWeatherData] = React.useState({});
  const [weatherBanner, setWeatherBanner] = React.useState("");
  const [clothingCards, setClothingCards] = React.useState([]);
  const [activePopup, setActivePopup] = React.useState("");
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [value, setValue] = React.useState(false);
  const [currentTempUnit, setCurrentTempUnit] = React.useState("F");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [token, setToken] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const history = useHistory();

  const handleLogin = (email, pw) => {
    auth
      .signIn(email, pw)
      .then((data) => {
        if (data.token) {
          auth
            .checkToken(data.token)
            .then((res) => {
              return res;
            })
            .then((data) => {
              setCurrentUser(data);
            })
            .then(() => {
              setIsLoggedIn(true);
            })
            .then(() => {
              history.push("/profile");
            })
            .catch((err) => console.log(err));
        }
      })
      .then(() => {
        closePopups();
      })
      .catch((err) => console.log(err));
  };

  const handleRegister = (avatar, email, name, pw) => {
    setIsLoading(true);

    auth
      .signUp(avatar, email, name, pw)
      .then((res) => {
        console.log(res ? true : false);
        if (res) {
          setCurrentUser(res);
        } else {
          console.log("Something went wrong.");
        }
      })
      .then(() => {
        handleLogin(email, pw);
      })
      .then(() => {
        closePopups();
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
    localStorage.removeItem("jwt");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActivePopup("image");
  };

  const handleAddClick = () => {
    setActivePopup("add");
  };

  const handleLoginClick = () => {
    setActivePopup("login");
  };

  const handleLogoutClick = () => {
    setActivePopup("logout");
  };

  const handleEditClick = () => {
    setActivePopup("edit");
  };

  const handleRegisterClick = () => {
    setActivePopup("register");
  };

  const handleMobileClick = () => {
    setActivePopup("mobile");
  };

  const handleDeleteClick = () => {
    setActivePopup("confirm");
  };

  const handleCancel = () => {
    setActivePopup("image");
  };

  const handleOutClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopups();
    }
  };

  const closePopups = () => {
    setActivePopup("");
  };

  const handleSwitchToggle = () => {
    setValue(!value);
    setCurrentTempUnit(currentTempUnit === "F" ? "C" : "F");
  };

  const handleAddSubmit = (rawCard, token) => {
    setIsLoading(true);

    addClothing(rawCard, token)
      .then((data) => {
        const card = rawCard;
        card._id = data.data._id;
        card.owner = currentUser.data._id;
        card.likes = data.data.likes;
        setClothingCards([...clothingCards, card]);
      })
      .then(() => {
        closePopups();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditSubmit = ({ name, avatarUrl }) => {
    setIsLoading(true);

    editProfile({ name, avatarUrl }, token)
      .then(() => {
        setCurrentUser({
          data: {
            ...currentUser.data,
            name: name,
            avatar: avatarUrl,
          },
        });
        closePopups();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    setIsLoading(true);

    deleteCard(id, token)
      .then(() => {
        setClothingCards(
          clothingCards.filter((card) => {
            if (card._id === id) {
              return false;
            }
            return true;
          })
        );
        closePopups();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLike = (id, isLiked, user) => {
    isLiked
      ? removeLike(id, user, token)
          .then((updatedCard) => {
            setClothingCards((cards) =>
              cards.map((c) => (c._id === id ? updatedCard.data : c))
            );
          })
          .catch((err) => console.log(err))
      : addLike(id, user, token)
          .then((updatedCard) => {
            setClothingCards((cards) =>
              cards.map((c) => (c._id === id ? updatedCard.data : c))
            );
          })
          .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      setToken(jwt);

      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
          }
          return res;
        })
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  React.useEffect(() => {
    if (latitude && longitude) {
      getWeather({ longitude, latitude }, apiKey)
        .then((data) => {
          setWeatherData(filterData(data));
          setWeatherBanner(getWeatherBanner(data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  React.useEffect(() => {
    getClothing()
      .then((data) => {
        setClothingCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    const closeWithEsc = (evt) => {
      if (evt.key === "Escape") {
        closePopups();
      }
    };

    window.addEventListener("keydown", closeWithEsc);

    return () => {
      window.removeEventListener("keydown", closeWithEsc);
    };
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTempUnitContext.Provider
        value={{ currentTempUnit, handleSwitchToggle, value }}
      >
        <Header
          weatherData={weatherData}
          handleClick={handleAddClick}
          handleMobile={handleMobileClick}
          isLoggedIn={isLoggedIn}
          handleLogin={handleLoginClick}
          handleRegister={handleRegisterClick}
        />
        <Route exact path="/">
          <Main
            weatherData={weatherData}
            cards={clothingCards}
            onCardClick={handleCardClick}
            banner={weatherBanner}
            onLike={handleLike}
            isLoggedIn={isLoggedIn}
          />
        </Route>
        <ProtectedRoute path="/profile" isLoggedIn={isLoggedIn}>
          <Profile
            cards={clothingCards}
            onCardClick={handleCardClick}
            onAddClick={handleAddClick}
            isLoggedIn={isLoggedIn}
            editClick={handleEditClick}
            logoutClick={handleLogoutClick}
            onLike={handleLike}
          />
        </ProtectedRoute>
        <Footer />
        {activePopup === "add" && (
          <AddItemPopup
            onAddItem={handleAddSubmit}
            closePopups={closePopups}
            handleOutClick={handleOutClick}
            token={token}
            isLoading={isLoading}
          />
        )}
        {activePopup === "image" && (
          <PopupWithImage
            card={selectedCard}
            onClose={closePopups}
            onOutClick={handleOutClick}
            onDeleteClick={handleDeleteClick}
            isLoggedIn={isLoggedIn}
          />
        )}
        {activePopup === "confirm" && (
          <PopupWithConfirmation
            onClose={closePopups}
            onOutClick={handleOutClick}
            onCancel={handleCancel}
            onDelete={handleDelete}
            card={selectedCard}
            isLoading={isLoading}
          />
        )}
        {activePopup === "mobile" && (
          <MobileMenu
            onClose={closePopups}
            onOutClick={handleOutClick}
            handleClick={handleAddClick}
            isLoggedIn={isLoggedIn}
            handleLogin={handleLoginClick}
            handleRegister={handleRegisterClick}
          />
        )}
        {activePopup === "login" && (
          <LoginPopup
            closePopups={closePopups}
            handleOutClick={handleOutClick}
            handleLogin={handleLogin}
            handleRegisterClick={handleRegisterClick}
            isLoading={isLoading}
          />
        )}
        {activePopup === "register" && (
          <RegisterPopup
            closePopups={closePopups}
            handleOutClick={handleOutClick}
            handleLoginClick={handleLoginClick}
            isLoading={isLoading}
            handleRegister={handleRegister}
          />
        )}
        {activePopup === "edit" && (
          <EditPopup
            closePopups={closePopups}
            handleOutClick={handleOutClick}
            token={token}
            handleEdit={handleEditSubmit}
            isLoading={isLoading}
          />
        )}
        {activePopup === "logout" && (
          <LogoutPopup
            closePopups={closePopups}
            handleOutClick={handleOutClick}
            logout={handleLogout}
          />
        )}
      </CurrentTempUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;
