



const kelvinToCelsius = (kelvin)=>{
  return kelvin - 273.15 //'°C'
}

const celsiusToFahrenheit = (celsuis)=>{
  return (celsuis *9/5) + 32
}


const fahrenheitToCelsius = (fahrenheit)=>{
  return (fahrenheit-32) * 5/9

}

export { kelvinToCelsius, celsiusToFahrenheit, fahrenheitToCelsius }