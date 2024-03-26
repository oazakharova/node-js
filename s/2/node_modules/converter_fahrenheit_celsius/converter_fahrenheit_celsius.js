// Convert Fahrenheit to Celsius
function сonvertFahrenheitToCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

// Convert Celsius to Fahrenheit
function сonvertCelsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

// Export of functions
module.exports = {
  сonvertFahrenheitToCelsius,
  сonvertCelsiusToFahrenheit,
};
