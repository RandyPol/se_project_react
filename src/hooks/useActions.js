import { useState } from 'react'
import api from '../utils/api'
import auth from '../utils/auth'

const useActions = (
  clothingItems,
  setCurrentUser,
  setLoggedIn,
  setClothingItems,
  handleFormToggleOpen,
  handleDeleteModalToggleOpen,
  handleRegisterModalToggleOpen,
  handleLoginModalToggleOpen,
  handleProfileEditModalToggleOpen
) => {
  const [isTempFahrenheit, setIsTempFahrenheit] = useState(true)
  const [cardItem, setCardItem] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  // Toggle the temperature unit between Fahrenheit and Celsius
  const handleTempUnitToggle = () => {
    setIsTempFahrenheit((prev) => !prev)
  }

  // Add a new clothing item to the server
  const handleAddItemSubmit = (newItem) => {
    setIsLoading((prev) => !prev)
    return api
      .postClothingItem(newItem)
      .then((addedData) => {
        setClothingItems([addedData, ...clothingItems])
        handleFormToggleOpen()
        return Promise.resolve()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading((prev) => !prev)
      })
  }

  // Delete a clothing item from the server
  const handleCardDelete = (id) => {
    setIsLoading((prev) => !prev)
    api
      .deleteClothesItem(id)
      .then(() => {
        const newClothingItems = clothingItems.filter((item) => {
          return item._id !== id
        })
        setClothingItems(newClothingItems)
        handleDeleteModalToggleOpen()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading((prev) => !prev)
      })
  }

  // Handle Register
  const handleRegister = ({ name, avatar, email, password }) => {
    setIsLoading((prev) => !prev)
    auth
      .register(name, avatar, email, password)
      .then((data) => {
        if (data) {
          handleRegisterModalToggleOpen()
          handleLogin({ email, password }, false)
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading((prev) => !prev)
      })
  }

  // Handle Login and set the JWT token
  const handleLogin = ({ email, password }, close = true) => {
    setIsLoading((prev) => !prev)
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', JSON.stringify(data.token))
          return auth.checkToken(data.token)
        } else {
          throw new Error('Token not received')
        }
      })
      .then((userData) => {
        setCurrentUser(userData)
        setLoggedIn(true)
        handleLoginModalToggleOpen(close)
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading((prev) => !prev)
      })
  }

  // Handle Profile Edit and update the user info
  const handleProfileEdit = ({ name, avatar }) => {
    setIsLoading((prev) => !prev)
    api
      .updateProfile(name, avatar)
      .then((data) => {
        setCurrentUser(data)
        handleProfileEditModalToggleOpen()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading((prev) => !prev)
      })
  }

  // Handle card like
  const handleCardLike = (id, isLiked) => {
    isLiked
      ? api
          .removeCardLike(id)
          .then((updatedCard) => {
            const newCards = clothingItems.map((c) =>
              c._id === id ? updatedCard : c
            )
            setClothingItems(newCards)
          })
          .catch((err) => console.log(err))
      : api
          .addCardLike(id)
          .then((updatedCard) => {
            const newCards = clothingItems.map((c) =>
              c._id === id ? updatedCard : c
            )
            setClothingItems(newCards)
          })
          .catch((err) => console.log(err))
  }

  // Handle Logout and remove the JWT token
  const handleLogout = () => {
    localStorage.removeItem('jwt')
    setLoggedIn(false)
    setCurrentUser({})
  }

  return {
    isTempFahrenheit,
    handleTempUnitToggle,
    cardItem,
    setCardItem,
    isLoading,
    setIsLoading,
    handleAddItemSubmit,
    handleCardDelete,
    handleRegister,
    handleProfileEdit,
    handleCardLike,
    handleLogin,
    handleLogout,
  }
}

export default useActions
