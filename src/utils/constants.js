import dayCloudy from "../images/DCloudy.png";
import dayFog from "../images/DFog.png";
import dayRain from "../images/DRain.png";
import daySnow from "../images/DSnow.png";
import dayStorm from "../images/DStorm.png";
import daySunny from "../images/DSunny.png";

import nightCloudy from "../images/NCloudy.png";
import nightFog from "../images/NFog.png";
import nightRain from "../images/NRain.png";
import nightSnow from "../images/NSnow.png";
import nightStorm from "../images/NStorm.png";
import nightSunny from "../images/NSunny.png";

export const apiKey = "8c8d7f8b52711703dd5bab46ed07615d";
export const latitude = 47.58;
export const longitude = -122.3;
export const baseUrl = "http://localhost:3001";

export const dayBanners = {
  cloudy: dayCloudy,
  fog: dayFog,
  rain: dayRain,
  snow: daySnow,
  storm: dayStorm,
  sunny: daySunny,
};

export const nightBanners = {
  cloudy: nightCloudy,
  fog: nightFog,
  rain: nightRain,
  snow: nightSnow,
  storm: nightStorm,
  sunny: nightSunny,
};

export const processRes = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};
