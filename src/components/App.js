import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import PopupWithImage from "./PopupWithImage";
import { getWeather, filterData } from "../utils/weatherApi";
import {
  apiKey,
  lagitude,
  longitude,
  defaultClothing,
} from "../utils/constants";

const App = () => {
  const [weatherData, setWeatherData] = React.useState({});
  const [clothingCards, setClothingCards] = React.useState([]);
  const [activePopup, setActivePopup] = React.useState();
  const [selectedCard, setSelectedCard] = React.useState(null);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActivePopup("image");
  };

  const handleAddClick = () => {
    setActivePopup("add");
  };

  const closePopups = (evt) => {
    setActivePopup();
  };

  const escClosePopup = (evt) => {
    if (evt.key === "Escape") {
      setActivePopup();
    }
  };

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
    window.addEventListener("keydown", escClosePopup);

    return () => {
      window.removeEventListener("keydown", escClosePopup);
    };
  }, []);

  return (
    <>
      <Header weatherData={weatherData} handleClick={handleAddClick} />
      <Main
        weatherData={weatherData}
        cards={clothingCards}
        onCardClick={handleCardClick}
      />
      <Footer />
      {activePopup === "add" && (
        <PopupWithForm
          title="New garment"
          name="add"
          onClose={closePopups}
          buttonText="Add garment"
        >
          <label className="popup__label">
            Name
            <input
              className="popup__input"
              type="text"
              placeholder="Name"
              required
              name="name"
              id="inputName"
              minLength="1"
              maxLength="30"
            />
            <span className="popup__input-error inputName-error"></span>
          </label>
          <label className="popup__label">
            Image
            <input
              className="popup__input"
              placeholder="Image URL"
              required
              name="imageURL"
              id="inputURL"
              type="url"
            />
            <span className="popup__input-error inputLink-error"></span>
          </label>
          <p className="popup__text">Select the weather type:</p>
          <div className="popup__input_container">
            <div>
              <input type="radio" id="hot" name="tempRange" value="hot" />
              <label className="popup__label_multiple" htmlFor="hot">
                Hot
              </label>
            </div>
            <div>
              <input type="radio" id="warm" name="tempRange" value="hot" />
              <label className="popup__label_multiple" htmlFor="warm">
                Warm
              </label>
            </div>
            <div>
              <input type="radio" id="cold" name="tempRange" value="hot" />
              <label className="popup__label_multiple" htmlFor="cold">
                Cold
              </label>
            </div>
          </div>
        </PopupWithForm>
      )}
      {activePopup === "image" && (
        <PopupWithImage card={selectedCard} onClose={closePopups} />
      )}
    </>
  );
};

export default App;
