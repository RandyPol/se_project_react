import { useState, useEffect } from 'react'
import auth from '../utils/auth'

export default function useAuth() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      auth
        .checkToken(JSON.parse(token))
        .then((userData) => {
          setCurrentUser(userData)
          setLoggedIn(true)
        })
        .catch((error) => console.error(error))
        .finally(() => setCheckingAuth(false))
    } else {
      setCheckingAuth(false)
    }
  }, [])

  return { loggedIn, checkingAuth, currentUser, setCurrentUser, setLoggedIn }
}
