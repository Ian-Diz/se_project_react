import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithImage from "./PopupWithImage";
import { getWeather, filterData, getWeatherBanner } from "../utils/weatherApi";
import { apiKey, latitude, longitude } from "../utils/constants";
import CurrentTempUnitContext from "../contexts/CurrentTempUnitContext";
import { Route } from "react-router-dom";
import Profile from "./Profile";
import AddItemPopup from "./AddItemPopup";
import PopupWithConfirmation from "./PopupWithConfirmation";
import { addClothing, deleteCard, getClothing } from "../utils/api";
import MobileMenu from "./MobileMenu";

const App = () => {
  const [weatherData, setWeatherData] = React.useState({});
  const [weatherBanner, setWeatherBanner] = React.useState();
  const [clothingCards, setClothingCards] = React.useState([]);
  const [activePopup, setActivePopup] = React.useState();
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [value, setValue] = React.useState(false);
  const [currentTempUnit, setCurrentTempUnit] = React.useState("F");

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActivePopup("image");
  };

  const handleAddClick = () => {
    setActivePopup("add");
  };

  const handleMobileClick = () => {
    setActivePopup("mobile");
  };

  const handleDeleteClick = () => {
    setActivePopup("confirm");
  };

  const handleOutClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      setActivePopup();
    }
  };

  const closePopups = () => {
    setActivePopup();
  };

  const handleSwitchToggle = () => {
    setValue(!value);
    setCurrentTempUnit(currentTempUnit === "F" ? "C" : "F");
  };

  const handleAddSubmit = (rawCard) => {
    addClothing(rawCard)
      .then((data) => {
        const card = rawCard;
        card.id = data.id;
        setClothingCards([card, ...clothingCards]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    setActivePopup("image");
  };

  const handleDelete = (id) => {
    deleteCard(id)
      .then(() => {
        console.log(id);
        setClothingCards(
          clothingCards.filter((card) => {
            if (card.id === id) {
              console.log(card.id);
              return false;
            }
            return true;
          })
        );
        closePopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        setActivePopup();
      }
    };

    window.addEventListener("keydown", closeWithEsc);

    return () => {
      window.removeEventListener("keydown", closeWithEsc);
    };
  }, []);

  return (
    <>
      <CurrentTempUnitContext.Provider
        value={{ currentTempUnit, handleSwitchToggle, value }}
      >
        <Header
          weatherData={weatherData}
          handleClick={handleAddClick}
          handleMobile={handleMobileClick}
        />
        <Route exact path="/">
          <Main
            weatherData={weatherData}
            cards={clothingCards}
            onCardClick={handleCardClick}
            banner={weatherBanner}
          />
        </Route>
        <Route path="/profile">
          <Profile
            cards={clothingCards}
            onCardClick={handleCardClick}
            onAddClick={handleAddClick}
          />
        </Route>
        <Footer />
        {activePopup === "add" && (
          <AddItemPopup
            onAddItem={handleAddSubmit}
            closePopups={closePopups}
            handleOutClick={handleOutClick}
          />
        )}
        {activePopup === "image" && (
          <PopupWithImage
            card={selectedCard}
            onClose={closePopups}
            onOutClick={handleOutClick}
            onDeleteClick={handleDeleteClick}
          />
        )}
        {activePopup === "confirm" && (
          <PopupWithConfirmation
            onClose={closePopups}
            onOutClick={handleOutClick}
            onCancel={handleCancel}
            onDelete={handleDelete}
            card={selectedCard}
          />
        )}
        {activePopup === "mobile" && (
          <MobileMenu
            onClose={closePopups}
            onOutClick={handleOutClick}
            handleClick={handleAddClick}
          />
        )}
      </CurrentTempUnitContext.Provider>
    </>
  );
};

export default App;
