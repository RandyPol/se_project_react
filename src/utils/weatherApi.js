import { coordinates, AUTH_TOKEN } from './constants'

const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.long}&units=imperial&appid=${AUTH_TOKEN}`

// here is the code of the checking the response status
function checkResponse(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Error: ${res.status}`)
}

export function requestWeatherApiData() {
  return fetch(API_URL).then(checkResponse)
}

// Function Fer to Cel
const ferToCel = (fer) => {
  return Math.floor((fer - 32) * (5 / 9))
}

// Function to process the data from the API
export const weatherDataProcesing = (weatherData) => {
  // Desctructuring the data from the API
  const {
    main: { temp },
    name,
    weather: [{ main }],
    sys: { sunrise, sunset },
  } = weatherData

  const currentTime = Date.now()
  const timeOfDay =
    currentTime >= sunrise * 1000 && currentTime < sunset * 1000
      ? 'day'
      : 'night'

  // Creating the object with the data we need
  const weather = {
    temp: Math.floor(temp),
    tempCel: ferToCel(temp),
    name,
    main,
    sunrise,
    sunset,
    timeOfDay,
  }

  if (temp >= 86) {
    weather.tempDescription = 'hot'
  } else if (temp >= 66 && temp <= 85) {
    weather.tempDescription = 'warm'
  } else if (temp <= 65) {
    weather.tempDescription = 'cold'
  }
  return weather
}
