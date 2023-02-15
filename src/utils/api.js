// const BASE_URL = 'http://localhost:3001'
const BASE_URL = 'https://my-json-server.typicode.com/randypol/se_project_react'

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

const api = {
  getInitialClothingItems,
  postClothingItem,
  deleteClothesItem,
}

export default api
