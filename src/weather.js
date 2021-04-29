



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

export { kelvinToCelsius, kelvinToFahrenheit, celsuisToKelvin, fahrenheitToKelvin }