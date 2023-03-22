import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithImage from "./PopupWithImage";
import { getWeather, filterData } from "../utils/weatherApi";
import {
  apiKey,
  lagitude,
  longitude,
  defaultClothing,
} from "../utils/constants";
import CurrentTempUnitContext from "./contexts/CurrentTempUnitContext";
import { Route } from "react-router-dom";
import Profile from "./Profile";
import AddItemPopup from "./AddItemPopup";
import PopupWithConfirmation from "./PopupWithConfirmation";

const App = () => {
  const [weatherData, setWeatherData] = React.useState({});
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

  const closeWithEsc = (evt) => {
    if (evt.key === "Escape") {
      setActivePopup();
    }
  };

  const handleSwitchToggle = () => {
    setValue(!value);
    currentTempUnit === "F" ? setCurrentTempUnit("C") : setCurrentTempUnit("F");
  };

  const handleAddSubmit = (card) => {
    card._id = clothingCards.length + 1;
    setClothingCards([card, ...clothingCards]);
  };

  const handleCancel = () => {
    setActivePopup("image");
  };

  const handleDelete = () => {};

  React.useEffect(() => {
    if (lagitude && longitude) {
      getWeather({ longitude, lagitude }, apiKey)
        .then((data) => {
          setWeatherData(filterData(data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  React.useEffect(() => {
    setClothingCards(defaultClothing);
  }, []);

  React.useEffect(() => {
    window.addEventListener("keydown", closeWithEsc);

    return () => {
      window.removeEventListener("keydown", closeWithEsc);
    };
  }, []);

  return (
    <>
      <CurrentTempUnitContext.Provider
        value={{ currentTempUnit, handleSwitchToggle }}
      >
        <Header
          weatherData={weatherData}
          handleClick={handleAddClick}
          switchIsOn={value}
          switchHandleToggle={handleSwitchToggle}
        />
        <Route exact path="/">
          <Main
            weatherData={weatherData}
            cards={clothingCards}
            onCardClick={handleCardClick}
          />
        </Route>
        <Route path="/profile">
          <Profile cards={clothingCards} onCardClick={handleCardClick} />
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
          />
        )}
      </CurrentTempUnitContext.Provider>
    </>
  );
};

export default App;
