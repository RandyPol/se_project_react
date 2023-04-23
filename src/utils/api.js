const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.weather2023.mooo.com'
    : 'http://localhost:3001'

// Check the response from the server
const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
}

// Standar fetch request with the authorization header added
const request = (url, options) => {
  const token = JSON.parse(localStorage.getItem('jwt'))
  if (
    token &&
    !url.includes('/signin') &&
    !url.includes('/signup') &&
    !(url.includes('/items') && options.method === 'GET')
  ) {
    options.headers.Authorization = `Bearer ${token}`
  }
  return fetch(url, options).then(checkResponse)
}

/**
 * Get the initial clothing items from the server
 * The method is Get by default so we don't need to specify it
 * @returns {Promise} Promise object represents the result of fetching the initial cards from the server
 */
const getInitialClothingItems = () => {
  return request(`${BASE_URL}/items`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

/**
 * Post a new clothing item to the server
 * @param {Object} item - The new clothing item to be posted
 * @returns {Promise} Promise object represents the result of posting the new card to the server
 * @example
 * const item = {
 * name: 'T-shirt',
 * weather: 'hot',
 * imageUrl: 'https://images.unsplash.com/23234',
 * }
 *
 */

const postClothingItem = (item) => {
  return request(`${BASE_URL}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })
}

/**
 * Delete a clothing item from the server
 * @param {String} id - The id of the clothing item to be deleted
 * @returns {Promise} Promise object represents the result of deleting the card from the server
 *
 */

const deleteClothesItem = (id) => {
  return request(`${BASE_URL}/items/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

/**
 * Update user profile data on the server
 * @param {String} name - The name of the user
 * @param {String} avatar - The avatar of the user
 * @returns {Promise} Promise object represents the result of updating the user profile data on the server
 *
 */

const updateProfile = (name, avatar) => {
  return request(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      avatar,
    }),
  })
}

/**
 * Add card likes to the server
 * @param {String} id - The id of the card to be liked
 * @returns {Promise} Promise object represents the result of adding the card like to the server
 */

const addCardLike = (id) => {
  return request(`${BASE_URL}/items/${id}/likes`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

/**
 * Remove card likes from the server
 * @param {String} id - The id of the card to be unliked
 * @retuns {Promise} Promise object represents the result of removing the card like from the server
 *
 */

const removeCardLike = (id) => {
  return request(`${BASE_URL}/items/${id}/likes`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

const api = {
  getInitialClothingItems,
  postClothingItem,
  deleteClothesItem,
  updateProfile,
  addCardLike,
  removeCardLike,
}

export default api
