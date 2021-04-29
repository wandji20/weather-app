import './styles.css';
import displayNav from "./nav";



const apiKey = '17c75489c7d51e26cfe6254a64c6e232';

const getWeatherInfo = (location) => {
  location = location.toLowerCase();
  console.log(location);
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => displayData(data))
  .catch(err => console.log(err))
};


const kelvinToCelsius = (kelvin)=>{
  return kelvin - 273.15 //'°C'
}

const celsuisToKelvin = (celsuis)=>{
  return celsuis + 273.15
}

const kelvinToFahrenheit = (kelvin)=>{
  return (kelvin - 273.15) * 9/5 + 32
}

const fahrenheitToKelvin = (fahrenheit)=>{
  return 273.15 + (fahrenheit-32) * 5/9
}

const displayWeatherIcon = (icon)=>{
  let img = document.querySelector('#content').appendChild(document.createElement('img'))
  img.src = `http://openweathermap.org/img/wn/${icon}@2x.png`
  img.setAttribute('class', 'img-fluid icon')
}

const displayData = (data) =>{
  let temperature = kelvinToCelsius(data.main.temp);
  // let minTemp = toCelsius(data.main.temp_min);
  // let maxTemp = toCelsius(data.main.temp_max);
  // console.log(temperature, minTemp, maxTemp);
  let celsius = kelvinToCelsius(data.main.temp)
  let fahrenheit = kelvinToFahrenheit(data.main.temp)
  displayWeatherIcon(data.weather[0].icon)
}


const start = ()=>{
  displayNav();
  // getWeatherInfo('dubai');
  
}
start()