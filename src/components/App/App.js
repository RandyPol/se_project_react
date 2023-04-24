import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import ItemModal from '../ItemModal/ItemModal'
import Profile from '../Profile/Profile'
import AddItemModal from '../AddItemModal/AddItemModal'
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal'
import RegisterModal from '../RegisterModal/RegisterModal'
import LoginModal from '../LoginModal/LoginModal'
import EditProfileModal from '../EditProfileModal/EditProfileModal'
import CircularProgress from '@mui/material/CircularProgress'
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import ProtectedRoute from '../ProtectedRoute'

// Hooks and utils imports
import useAuth from '../../hooks/useAuth'
import useWeather from '../../hooks/useWeather'
import useClothingItems from '../../hooks/useClothingItems'
import useModalStates from '../../hooks/useModalStates'

import api from '../../utils/api'

function App() {
  const { loggedIn, checkingAuth, currentUser, setCurrentUser, setLoggedIn } =
    useAuth()
  const { weatherData } = useWeather()
  const { clothingItems, setClothingItems } = useClothingItems()
  const {
    isModalFormOpen,
    isItemModalOpen,
    isDeleteModalOpen,
    isRegisterFormOpen,
    isLoginFormOpen,
    isProfileEditFormOpen,
    setIsModalFormOpen,
    setIsItemModalOpen,
    setIsDeleteModalOpen,
    setIsRegisterFormOpen,
    setIsLoginFormOpen,
    setIsProfileEditFormOpen,
  } = useModalStates()


  const [isTempFahrenheit, setIsTempFahrenheit] = React.useState(true)

  // Card item info for the Card that was clicked to open the ItemModal
  const [cardItem, setCardItem] = React.useState({})

  // Toggle the temperature unit between Fahrenheit and Celsius
  const handleTempUnitToggle = () => {
    setIsTempFahrenheit((prev) => !prev)
  }

  // This is the function to toggle open and close the form modal
  const handleFormToggleOpen = () => {
    setIsModalFormOpen((prevs) => !prevs)
  }

  // Handle the toggle for the RegisterModal
  const handleRegisterModalToggleOpen = () => {
    setIsRegisterFormOpen((prevs) => !prevs)
  }

  // Handle the toggle for the LoginModal
  const handleLoginModalToggleOpen = (status = true) => {
    if (status) setIsLoginFormOpen((prevs) => !prevs)
  }

  // Handle the toggle for the ProfileEditModal
  const handleProfileEditModalToggleOpen = () => {
    setIsProfileEditFormOpen((prevs) => !prevs)
  }

  // Handle the toggle for the ItemModal
  const handleItemModalToggleOpen = (cardInfo) => {
    setCardItem(cardInfo)
    setIsItemModalOpen((prevs) => !prevs)
  }
  // Handle the toggle for the DeleteModal
  const handleDeleteModalToggleOpen = () => {
    setIsDeleteModalOpen((prevs) => !prevs)
  }
  // Add a new clothing item to the server
  const handleAddItemSubmit = (newItem) => {
    setIsLoading((prev) => !prev)
    return api
      .postClothingItem(newItem)
      .then((addedData) => {
        setClothingItems([addedData, ...clothingItems])
        setIsModalFormOpen((prevs) => !prevs)
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

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        isLoading,
        handleLogout,
        handleProfileEditModalToggleOpen,
      }}
    >
      <div className="page">
        <div className="page__container">
          <CurrentTemperatureUnitContext.Provider
            value={{
              isModalFormOpen,
              isItemModalOpen,
              isDeleteModalOpen,
              weatherData,
              clothingItems,
              isTempFahrenheit,
              handleTempUnitToggle,
              handleFormToggleOpen,
              handleItemModalToggleOpen,
              handleRegisterModalToggleOpen,
              handleLoginModalToggleOpen,
              loggedIn,
              handleCardLike,
            }}
          >
            <Header />

            {checkingAuth ? (
              <CircularProgress />
            ) : (
              <Switch>
                <Route exact path="/">
                  <Main />
                </Route>
                <ProtectedRoute
                  path="/profile"
                  component={Profile}
                  loggedIn={loggedIn}
                />
              </Switch>
            )}

            <Footer />
            {isModalFormOpen && (
              <AddItemModal
                isModalFormOpen={isModalFormOpen}
                onAddItem={handleAddItemSubmit}
                handleFormToggleOpen={handleFormToggleOpen}
              />
            )}
            {isItemModalOpen && (
              <ItemModal
                handleItemModalToggleOpen={handleItemModalToggleOpen}
                name={'image'}
                cardItem={cardItem}
                handleDeleteModalToggleOpen={handleDeleteModalToggleOpen}
              />
            )}
            {isRegisterFormOpen && (
              <RegisterModal
                isRegisterFormOpen={isRegisterFormOpen}
                handleRegisterModalToggleOpen={handleRegisterModalToggleOpen}
                handleLoginModalToggleOpen={handleLoginModalToggleOpen}
                handleRegister={handleRegister}
              />
            )}
            {isLoginFormOpen && (
              <LoginModal
                isLoginFormOpen={isLoginFormOpen}
                handleLoginModalToggleOpen={handleLoginModalToggleOpen}
                handleRegisterModalToggleOpen={handleRegisterModalToggleOpen}
                handleLogin={handleLogin}
              />
            )}
            {isProfileEditFormOpen && (
              <EditProfileModal
                isProfileEditFormOpen={isProfileEditFormOpen}
                handleProfileEditModalToggleOpen={
                  handleProfileEditModalToggleOpen
                }
                handleProfileEdit={handleProfileEdit}
              />
            )}

            {isDeleteModalOpen && (
              <DeleteConfirmationModal
                isLoading={isLoading}
                isDeleteModalOpen={isDeleteModalOpen}
                name={'deleteConfirmation'}
                cardItem={cardItem}
                handleCardDelete={handleCardDelete}
                handleDeleteModalToggleOpen={handleDeleteModalToggleOpen}
              />
            )}
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
