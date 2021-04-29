const kelvinToCelsius = (kelvin) => kelvin - 273.15;

const celsiusToFahrenheit = (celsuis) => (celsuis * (9 / 5)) + 32;

const fahrenheitToCelsius = (fahrenheit) => (fahrenheit - 32) * (5 / 9);

export { kelvinToCelsius, celsiusToFahrenheit, fahrenheitToCelsius };