import './styles.css';

const apiKey = '17c75489c7d51e26cfe6254a64c6e232';

const getWeatherInfo = (location) => {
  location = location.toLowerCase();
  console.log(location);
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => displayData(data))
  .catch(err => console.log(err))
};
getWeatherInfo('LImbe');




const displayData = (data) =>{
  console.log(data)
}