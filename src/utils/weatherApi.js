import { dayBanners, nightBanners } from "./constants";

const getWeather = (config, apiKey) => {
  const longitude = config.longitude;
  const latitude = config.latitude;
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};

const filterData = (data) => {
  if (!data) {
    return null;
  }

  const weather = { temp: {} };
  weather.city = data.name;
  weather.temp.F = `${Math.round(data.main.temp)}°F`;
  weather.temp.C = `${Math.round(((data.main.temp - 32) * 5) / 9)}°C`;
  weather.temp.calc = data.main.temp;
  weather.weather = data.weather[0].main;

  return weather;
};

console.log(Date.now() / 1000);

const getWeatherBanner = (data) => {
  if (Date.now() / 1000 > data.sys.sunrise) {
    if (data.weather[0].id >= 800 && data.weather[0].id <= 801) {
      return dayBanners.sunny;
    } else if (data.weather[0].id >= 802 && data.weather[0].id <= 804) {
      return dayBanners.cloudy;
    } else if (data.weather[0].id >= 701 && data.weather[0].id <= 781) {
      return dayBanners.fog;
    } else if (data.weather[0].id >= 600 && data.weather[0].id <= 622) {
      return dayBanners.snow;
    } else if (
      (data.weather[0].id >= 500 && data.weather[0].id <= 531) ||
      (data.weather[0].id >= 300 && data.weather[0].id <= 321)
    ) {
      return dayBanners.rain;
    } else if (data.weather[0].id >= 200 && data.weather[0].id <= 232) {
      return dayBanners.storm;
    }
  } else if (
    Date.now() / 1000 > data.sys.sunset ||
    Date.now() / 1000 < data.sys.sunrise
  ) {
    if (data.weather[0].id >= 800 && data.weather[0].id <= 801) {
      return nightBanners.sunny;
    } else if (data.weather[0].id >= 802 && data.weather[0].id <= 804) {
      return nightBanners.cloudy;
    } else if (data.weather[0].id >= 701 && data.weather[0].id <= 781) {
      return nightBanners.fog;
    } else if (data.weather[0].id >= 600 && data.weather[0].id <= 622) {
      return nightBanners.snow;
    } else if (
      (data.weather[0].id >= 500 && data.weather[0].id <= 531) ||
      (data.weather[0].id >= 300 && data.weather[0].id <= 321)
    ) {
      return nightBanners.rain;
    } else if (data.weather[0].id >= 200 && data.weather[0].id <= 232) {
      return nightBanners.storm;
    }
  }
};

export { getWeather, filterData, getWeatherBanner };
