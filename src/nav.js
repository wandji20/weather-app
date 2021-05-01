import '../assets/logo.png';
// eslint-disable-next-line import/no-cycle
import {
  kelvinToCelsius, celsiusToFahrenheit, fahrenheitToCelsius, getWeatherInfo,
} from './weather';

const body = document.querySelector('body');
const content = document.querySelector('#content');

const displayWeatherIcon = (icon, node) => {
  const img = node.appendChild(document.createElement('img'));
  img.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  img.setAttribute('class', 'img-fluid icon');
};

const displayWeatherInfo = (data) => {
  const body = document.querySelector('body');
  if (data.main.temp >= 303.15) {
    body.setAttribute('class', 'sunny-bg');
  } else if (data.main.temp >= 293.15) {
    body.setAttribute('class', 'average-bg');
  } else if (data.main.temp < 293.15) {
    body.setAttribute('class', 'low-bg');
  }
  const mainSection = document.querySelector('.main-section');
  mainSection.innerHTML = '';
  const details = mainSection.appendChild(document.createElement('div'));
  const detailsPara = details.appendChild(document.createElement('p'));
  detailsPara.innerHTML = `Feels like ${Math.round(kelvinToCelsius(data.main.feels_like))}°C. ${data.weather[0].description}.`;
  const list = details.appendChild(document.createElement('ul'));

  const item1 = list.appendChild(document.createElement('li'));
  const property1 = item1.appendChild(document.createElement('span'));
  property1.innerHTML = 'Pressure';
  property1.setAttribute('class', 'property');
  const property1Value = item1.appendChild(document.createElement('span'));
  property1Value.innerHTML = `${data.main.pressure} hPa`;
  property1Value.setAttribute('class', 'description-value');

  const item2 = list.appendChild(document.createElement('li'));
  const property2 = item2.appendChild(document.createElement('span'));
  property2.innerHTML = 'Humidity';
  property2.setAttribute('class', 'property');
  const property2Value = item2.appendChild(document.createElement('span'));
  property2Value.innerHTML = `${data.main.humidity} %`;
  property2Value.setAttribute('class', 'description-value');

  const item3 = list.appendChild(document.createElement('li'));
  const property3 = item3.appendChild(document.createElement('span'));
  property3.innerHTML = 'Longitude: ';
  property3.setAttribute('class', 'property');
  const property3Value = item3.appendChild(document.createElement('span'));
  property3Value.innerHTML = data.coord.lon;
  property3Value.setAttribute('class', 'description-value');

  const item4 = list.appendChild(document.createElement('li'));
  const property4 = item4.appendChild(document.createElement('span'));
  property4.innerHTML = 'Latitude: ';
  property4.setAttribute('class', 'property');
  const property4Value = item4.appendChild(document.createElement('span'));
  property4Value.innerHTML = data.coord.lat;
  property4Value.setAttribute('class', 'description-value');

  const temperature = mainSection.appendChild(document.createElement('div'));

  const timePara = temperature.appendChild(document.createElement('p'));
  timePara.appendChild(document.createElement('span')).innerHTML = data.sys.country;
  timePara.appendChild(document.createElement('span')).innerHTML = data.name;

  const temperaturePara = temperature.appendChild(document.createElement('p'));
  displayWeatherIcon(data.weather[0].icon, temperaturePara);
  const tempSpan = temperaturePara.appendChild(document.createElement('span'));
  tempSpan.innerHTML = `${Math.round(kelvinToCelsius(data.main.temp) * 10) / 10} °C`;
  tempSpan.classList.add('temp-span');

  const extraSection = document.querySelector('.extra-section');
  extraSection.innerHTML = '';
};

function displayNav() {
  const nav = body.insertBefore(document.createElement('nav'), content);
  const logo = nav.appendChild(document.createElement('img'));
  logo.src = '../assets/logo.png';

  const form = nav.appendChild(document.createElement('form'));
  const cityName = form.appendChild(document.createElement('input'));
  cityName.type = 'text';
  cityName.placeholder = 'Enter a city name';
  cityName.setAttribute('class', 'city-name');
  const formSubmit = form.appendChild(document.createElement('input'));
  formSubmit.type = 'submit';
  formSubmit.innerHTML = 'Search';
  formSubmit.setAttribute('class', 'submit-btn');
  formSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    if (cityName.value !== '') {
      getWeatherInfo(cityName.value);
      cityName.value = '';
    }
  });

  const btnContainer = nav.appendChild(document.createElement('div'));
  const tempBtn = btnContainer.appendChild(document.createElement('button'));
  tempBtn.setAttribute('class', 'temp-btn');
  tempBtn.textContent = '°F / °C';

  tempBtn.addEventListener('click', () => {
    const tempSpan = document.querySelector('.temp-span');
    if (tempSpan.innerHTML.endsWith('°C')) {
      let temp = parseFloat(tempSpan.innerHTML.split(' ')[0]);
      temp = celsiusToFahrenheit(temp);
      tempSpan.innerHTML = `${Math.round(temp)} °F`;
    } else if (tempSpan.innerHTML.endsWith('°F')) {
      let temp = parseFloat(tempSpan.innerHTML.split(' ')[0]);
      temp = fahrenheitToCelsius(temp);
      tempSpan.innerHTML = `${Math.round(temp)} °C`;
    }
  });
}

function contentStructure() {
  const mainSection = content.appendChild(document.createElement('section'));
  mainSection.setAttribute('class', 'main-section');

  const extraSection = content.appendChild(document.createElement('section'));
  extraSection.setAttribute('class', 'extra-section');
}

function displayAwaitText() {
  const extraSection = document.querySelector('.extra-section');
  extraSection.innerHTML = '';
  const para = extraSection.appendChild(document.createElement('p'));
  para.innerHTML = 'Getting Weather Info';
}

function displayError(text) {
  const extraSection = document.querySelector('.extra-section');
  extraSection.innerHTML = '';
  const para = extraSection.appendChild(document.createElement('p'));
  para.innerHTML = text;
}

export {
  displayNav, contentStructure, displayWeatherInfo, displayAwaitText, displayError,
};