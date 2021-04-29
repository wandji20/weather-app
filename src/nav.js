import "../assets/logo.png";
import {
  kelvinToCelsius, celsiusToFahrenheit, fahrenheitToCelsius
} from './weather'

const body =  document.querySelector('body')
const content = document.querySelector('#content')
const apiKey = '17c75489c7d51e26cfe6254a64c6e232';
const cityInput = document.querySelector('.city-name')
const formSubmit  = document.querySelector('.submit-btn')

const getWeatherInfo = (location) => {
  location = location.toLowerCase();
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => displayWeatherInfo(data))
  .catch(err => {
    // console.log(response.status)
    alert(`err\n Network Error`)
  })
};


function displayNav(){

  const nav = body.insertBefore(document.createElement('nav'), content)
  const logo = nav.appendChild(document.createElement('img'))
  logo.src = "../assets/logo.png"

  getWeatherInfo('london')
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
  tempBtn.textContent = '°F / °C'

  tempBtn.addEventListener('click',()=>{
  let tempSpan = document.querySelector('.temp-span')
  if (tempSpan.innerHTML.endsWith('°C')){
    let temp = parseFloat(tempSpan.innerHTML.split(' ')[0])
    temp = celsiusToFahrenheit(temp);
    tempSpan.innerHTML = Math.round(temp) +' °F'
  }else if(tempSpan.innerHTML.endsWith('°F')){
    let temp = parseFloat(tempSpan.innerHTML.split(' ')[0])
    temp = fahrenheitToCelsius(temp)
    tempSpan.innerHTML = Math.round(temp) +' °C'
  }
})
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
  const body = document.querySelector('body')
  if (data.main.temp >= 303.15){
    body.classList.add('sunny-bg')
  }else if (data.main.temp >= 293.15){
    body.classList.add('average-bg')
  }else if(data.main.temp < 293.15){
    body.classList.add('low-bg')
  }
  const mainSection = document.querySelector('.main-section');
  mainSection.innerHTML = '';
  const details = mainSection.appendChild(document.createElement('div'))
  let detailsPara = details.appendChild(document.createElement('p'))
  detailsPara.innerHTML = `Feels like ${Math.round(kelvinToCelsius(data.main.feels_like))}°C. ${data.weather[0].description}.`
  let list = details.appendChild(document.createElement('ul'))
  
  let item1 = list.appendChild(document.createElement('li'))
  let property1 = item1.appendChild(document.createElement('span'))
  property1.innerHTML = 'Pressure'
  property1.setAttribute('class', 'property')
  let property1Value = item1.appendChild(document.createElement('span'))
  property1Value.innerHTML = data.main.pressure + ' hPa'
  property1Value.setAttribute('class', 'description-value')

  let item2 = list.appendChild(document.createElement('li'))
  let property2 = item2.appendChild(document.createElement('span'))
  property2.innerHTML = 'Humidity'
  property2.setAttribute('class', 'property')
  let property2Value = item2.appendChild(document.createElement('span'))
  property2Value.innerHTML = data.main.humidity + ' %'
  property2Value.setAttribute('class', 'description-value')

  let item3= list.appendChild(document.createElement('li'))
  let property3= item3.appendChild(document.createElement('span'))
  property3.innerHTML = 'Longitude: '
  property3.setAttribute('class', 'property')
  let property3Value = item3.appendChild(document.createElement('span'))
  property3Value.innerHTML = data.coord.lon
  property3Value.setAttribute('class', 'description-value')

  let item4= list.appendChild(document.createElement('li'))
  let property4= item4.appendChild(document.createElement('span'))
  property4.innerHTML = 'Latitude: '
  property4.setAttribute('class', 'property')
  let property4Value = item4.appendChild(document.createElement('span'))
  property4Value.innerHTML = data.coord.lat
  property4Value.setAttribute('class', 'description-value')
    
    

  // {"coord":{"lon":55.3047,"lat":25.2582},  "weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],  "base":"stations",  "main":{"temp":302.65,"feels_like":301.82,"temp_min":301.15,"temp_max":304.15,"pressure":1008,"humidity":35},  "visibility":10000,  "wind":{"speed":1.54,"deg":230},  "clouds":{"all":0},  "dt":1619661475,  "sys":{"type":1,"id":7537,"country":"AE","sunrise":1619660652,"sunset":1619707670}, "timezone":14400,"id":292223, "name":"Dubai","cod":200}
  const temperature = mainSection.appendChild(document.createElement('div'))

  let timePara = temperature.appendChild(document.createElement('p'))
  timePara.appendChild(document.createElement('span')).innerHTML = data.sys.country
  timePara.appendChild(document.createElement('span')).innerHTML = data.name

  let temperaturePara = temperature.appendChild(document.createElement('p'))
  displayWeatherIcon( data.weather[0].icon, temperaturePara)
  let tempSpan = temperaturePara.appendChild(document.createElement('span'))
  tempSpan.innerHTML = Math.round(kelvinToCelsius(data.main.temp)*10)/10 + ' °C'
  tempSpan.classList.add('temp-span')
  
}



export {displayNav, contentStructure}