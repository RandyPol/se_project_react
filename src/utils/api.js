const BASE_URL = 'http://localhost:3001'

// Check the response from the server
const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
}

// Standar fetch request
const request = (url, options) => {
  return fetch(url, options).then(checkResponse)
}

/**
 * Get the initial clothing items from the server
 * The method is Get by default so we don't need to specify it
 * @returns {Promise} Promise object represents the result of fetching the initial cards from the server
 */
export const getInitialClothingItems = () => {
  return request(`${BASE_URL}/items`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

const api = {
  getInitialClothingItems,
}

export default api
