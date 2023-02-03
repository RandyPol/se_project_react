const defaultClothingItems = [
  {
    _id: 0,
    name: 'Cap',
    weather: 'hot',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591',
  },
  {
    _id: 1,
    name: 'Hoodie',
    weather: 'warm',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8',
  },
  {
    _id: 2,
    name: 'Jacket',
    weather: 'cold',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad',
  },
  {
    _id: 3,
    name: 'Sneakers',
    weather: 'cold',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f',
  },
  {
    _id: 4,
    name: 'T-Shirt',
    weather: 'hot',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09',
  },
  {
    _id: 5,
    name: 'Winter coat',
    weather: 'cold',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4',
  },
]

// Coordinates for Washington, DC
const coordinates = {
  lat: 38.9072,
  long: -77.0369,
}

// Coordinates for Santo Domingo, Dominican Republic
// const coordinates = {
//   lat: 18.4861,
//   long: -69.9312,
// }
// Coordinates for Dubai, United Arab Emirates
// const coordinates = {
//   lat: 25.2048,
//   long: -55.2708,
// }

// API key for OpenWeatherMap
const AUTH_TOKEN = 'c1430ab6198df500fa2a9ef9202d2bf6'

export { defaultClothingItems, coordinates, AUTH_TOKEN }
