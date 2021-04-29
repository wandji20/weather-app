import "../assets/logo.png";
import {
  kelvinToCelsius, kelvinToFahrenheit, celsuisToKelvin, fahrenheitToKelvin
} from './weather'

const body =  document.querySelector('body')
const content = document.querySelector('#content')
const apiKey = '17c75489c7d51e26cfe6254a64c6e232';
const cityInput = document.querySelector('.city-name')
const formSubmit  = document.querySelector('.submit-btn')

const getWeatherInfo = (location) => {
  location = location.toLowerCase();
  console.log(location);
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => displayWeatherInfo(data))
  .catch(err => console.log(err))
};


function displayNav(){
  const nav = body.insertBefore(document.createElement('nav'), content)
  const logo = nav.appendChild(document.createElement('img'))
  logo.src = "../assets/logo.png"

  const form = nav.appendChild(document.createElement('form'))
  const cityName = form.appendChild(document.createElement('input'))
  cityName.type = 'text'
  cityName.placeholder = 'Enter a city name'
  cityName.setAttribute('class', 'city-name' )
  const formSubmit = form.appendChild(document.createElement('input'))
  formSubmit.type = "submit";
  formSubmit.innerHTML = 'Search'
  formSubmit.setAttribute('class', 'submit-btn' )
  formSubmit.addEventListener('click', (e)=>{
    e.preventDefault();
    if (cityName.value !== ''){
      getWeatherInfo(cityName.value)
      cityName.value = ''
    }
  })

  const btnContainer = nav.appendChild(document.createElement('div'))
  const tempBtn = btnContainer.appendChild(document.createElement('button'))
  tempBtn.setAttribute('class', 'temp-btn')
  tempBtn.textContent = 'F / C'
}

const displayWeatherIcon = (icon, node)=>{
  let img = node.appendChild(document.createElement('img'))
  img.src = `http://openweathermap.org/img/wn/${icon}@2x.png`
  img.setAttribute('class', 'img-fluid icon')
}

function contentStructure(){
  const mainSection =  content.appendChild(document.createElement('section'))
  mainSection.setAttribute('class', 'main-section')

  const extraSection =  content.appendChild(document.createElement('section'))
  extraSection.setAttribute('class', 'extra-section')
}

const displayWeatherInfo =(data)=>{
  const mainSection = document.querySelector('.main-section');
  mainSection.innerHTML = '';
  const details = mainSection.appendChild(document.createElement('div'))
  let detailsPara = details.appendChild(document.createElement('p'))
  detailsPara.innerHTML = `Feels like temp. scattered clouds.`
  let list = details.appendChild(document.createElement('ul'))
  let listItem = list.appendChild(document.createElement('li'))
  let property = listItem.appendChild(document.createElement('span'))
  property.innerHTML = 'Description'
  property.setAttribute('class', 'property')
  let propertyValue = listItem.appendChild(document.createElement('span'))
  propertyValue.innerHTML = 'value'
  propertyValue.setAttribute('class', 'description-value')


  const temperature = mainSection.appendChild(document.createElement('div'))

  let timePara = temperature.appendChild(document.createElement('p'))
  timePara.appendChild(document.createElement('span')).innerHTML = 'present time'
  timePara.appendChild(document.createElement('span')).innerHTML = 'location'

  let temperaturePara = temperature.appendChild(document.createElement('p'))
  displayWeatherIcon( '01d', temperaturePara)
  temperaturePara.appendChild(document.createElement('span')).innerHTML = 'present temperature'

  
}


export {displayNav, contentStructure}