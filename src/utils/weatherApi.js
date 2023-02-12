import { coordinates, AUTH_TOKEN } from './constants'

const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.long}&units=imperial&appid=${AUTH_TOKEN}`

// const weatherObject = {
//   coord: {
//     lon: -77.0369,
//     lat: 38.9072,
//   },
//   weather: [
//     {
//       id: 800,
//       main: 'Clear',
//       description: 'clear sky',
//       icon: '01n',
//     },
//   ],
//   base: 'stations',
//   main: {
//     temp: 29.26,
//     feels_like: 29.26,
//     temp_min: 26.29,
//     temp_max: 32.32,
//     pressure: 1026,
//     humidity: 67,
//   },
//   visibility: 10000,
//   wind: {
//     speed: 0,
//     deg: 0,
//   },
//   clouds: {
//     all: 0,
//   },
//   dt: 1675303823,
//   sys: {
//     type: 2,
//     id: 2008521,
//     country: 'US',
//     sunrise: 1675253679,
//     sunset: 1675290519,
//   },
//   timezone: -18000,
//   id: 4140963,
//   name: 'Washington D.C.',
//   cod: 200,
// }

// here is the code of the checking the response status
function checkResponse(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Error: ${res.status}`)
}

export function request() {
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