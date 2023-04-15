export const BASE_URL = 'http://localhost:3000'

/**
 *
 * @param {*} name this is the name of the user
 * @param {*} avatar this is the avatar of the user
 * @param {*} email this is the email of the user
 * @param {*} password this is the password of the user
 * @returns {Promise} this is the promise of the request to the server. It returns the user data if the request is successful, otherwise it returns null.
 *
 */
export const register = async (name, avatar, email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
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
    if (!response.ok) {
      throw new Error('Some error happend in the server')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

/**
 *
 * @param {*} email this is the email of the user
 * @param {*} password this is the password of the user
 * @returns {Promise} this is the promise of the request to the server. It returns the user data if the request is successful, otherwise it returns null.
 *
 * */

export const authorize = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    if (!response.ok) {
      throw new Error('Some error happend in the server')
    }
    const data = await response.json()
    if (data.token) {
      localStorage.setItem('token', data.token)
      return data
    }
    return null
  } catch (error) {
    console.error(error)
    return null
  }
}
