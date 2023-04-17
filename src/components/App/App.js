import React from 'react'
// Import the routing components from react-router-dom
import { Route, Switch } from 'react-router-dom'
import './App.css'

// Components
import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import ItemModal from '../ItemModal/ItemModal'
import Profile from '../Profile/Profile'
import AddItemModal from '../AddItemModal/AddItemModal'
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal'
import RegisterModal from '../RegisterModal/RegisterModal'
import LoginModal from '../LoginModal/LoginModal'
// Context Data
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext'
import CurrentUserContext from '../../contexts/CurrentUserContext'
// Utils and constants
import api from '../../utils/api'
import {
  requestWeatherApiData,
  weatherDataProcesing,
} from '../../utils/weatherApi'
import ProtectedRoute from '../ProtectedRoute'
import auth from '../../auth'

function App() {
  const [weatherData, setWeatherData] = React.useState({})
  const [isModalFormOpen, setIsModalFormOpen] = React.useState(false)
  const [isItemModalOpen, setIsItemModalOpen] = React.useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isRegisterFormOpen, setIsRegisterFormOpen] = React.useState(false)
  const [isLoginFormOpen, setIsLoginFormOpen] = React.useState(false)

  // Login state
  const [loggedIn, setLoggedIn] = React.useState(false)

  // Current user state
  const [currentUser, setCurrentUser] = React.useState({})

  const [isTempFahrenheit, setIsTempFahrenheit] = React.useState(true)
  // Clothing items from the api
  const [clothingItems, setClothingItems] = React.useState([])
  // Card item info for the Card that was clicked to open the ItemModal
  const [cardItem, setCardItem] = React.useState({})

  // Check for token in local storage and set loggedIn state
  React.useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      auth
        .checkToken(JSON.parse(token))
        .then((userData) => {
          setCurrentUser(userData)
          setLoggedIn(true)
        })
        .catch((error) => console.error(error))
    }
  }, [])

  // Api call to get the weather data from the weather api (on mount only once)
  React.useEffect(() => {
    requestWeatherApiData()
      .then((data) => {
        // Update the weather data in the state after processing the data
        const processData = weatherDataProcesing(data)
        setWeatherData(processData)
      })
      .catch((err) => console.log(err))
  }, [])

  // useEffect to get clothing items from the api and set them to the state
  React.useEffect(() => {
    api
      .getInitialClothingItems()
      .then((data) => {
        setClothingItems(data)
      })
      .catch((err) => console.log(err))
  }, [])

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
          handleLoginModalToggleOpen(close)
          localStorage.setItem('jwt', JSON.stringify(data.token))
          setCurrentUser(data.user)
          setLoggedIn(true)
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading((prev) => !prev)
      })
  }

  // Handle Logout and remove the JWT token
  const handleLogout = () => {
    localStorage.removeItem('jwt')
    setLoggedIn(false)
    setCurrentUser({})
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, handleLogout }}>
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
            }}
          >
            <Header />
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

            <Footer />
            {isModalFormOpen && (
              <AddItemModal
                isModalFormOpen={isModalFormOpen}
                isLoading={isLoading}
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
                isLoading={isLoading}
                isRegisterFormOpen={isRegisterFormOpen}
                handleRegisterModalToggleOpen={handleRegisterModalToggleOpen}
                handleLoginModalToggleOpen={handleLoginModalToggleOpen}
                handleRegister={handleRegister}
              />
            )}
            {isLoginFormOpen && (
              <LoginModal
                isLoading={isLoading}
                isLoginFormOpen={isLoginFormOpen}
                handleLoginModalToggleOpen={handleLoginModalToggleOpen}
                handleRegisterModalToggleOpen={handleRegisterModalToggleOpen}
                handleLogin={handleLogin}
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
