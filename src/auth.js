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
 *
 * @param {*} name this is the name of the user
 * @param {*} avatar this is the avatar of the user
 * @param {*} email this is the email of the user
 * @param {*} password this is the password of the user
 * @returns {Promise} this is the promise of the request to the server. It returns the user data if the request is successful, otherwise it returns null.
 *
 */
const register = (name, avatar, email, password) => {
  return request(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      avatar,
      email,
      password,
    }),
  })
}

/**
 *
 * @param {*} email this is the email of the user
 * @param {*} password this is the password of the user
 * @returns {Promise} this is the promise of the request to the server. It returns the user data if the request is successful, otherwise it returns null.
 *
 * */

const authorize = ( email, password ) => {
  return request(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
}

const auth = {
  register,
  authorize,
}

export default auth
