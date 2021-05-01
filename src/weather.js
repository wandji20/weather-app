import {displayWeatherInfo} from './nav'
const apiKey = '17c75489c7d51e26cfe6254a64c6e232';

const kelvinToCelsius = (kelvin) => kelvin - 273.15;

const celsiusToFahrenheit = (celsuis) => (celsuis * (9 / 5)) + 32;

const fahrenheitToCelsius = (fahrenheit) => (fahrenheit - 32) * (5 / 9);

const getWeatherInfo = (location) => {
  location = location.toLowerCase();
  console.log(location)
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
    .then((response) => response.json())
    .then((data) => displayWeatherInfo(data))
    .catch((err) => {
      alert(`${err}\nUnknown location or\n Network Error`);
    });
};

function getUserCoord() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getUserWeatherInfo);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function getUserWeatherInfo(position) {
  let lat = position.coords.latitude
  let lon = position.coords.longitude
  fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=17c75489c7d51e26cfe6254a64c6e232`)
  .then((response)=> response.json())
  .then((data)=> getWeatherInfo(data[0].name))
  .catch((err)=> err)
}

export { kelvinToCelsius, celsiusToFahrenheit, fahrenheitToCelsius, getWeatherInfo, getUserCoord };