import React from 'react'
// Import the routing components from react-router-dom
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
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
// Context Data
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext'
// Utils and constants
import api from '../../utils/api'
import {
  requestWeatherApiData,
  weatherDataProcesing,
} from '../../utils/weatherApi'
import ProtectedRoute from '../ProtectedRoute'

function App() {
  const [weatherData, setWeatherData] = React.useState({})
  const [isModalFormOpen, setIsModalFormOpen] = React.useState(false)
  const [isItemModalOpen, setIsItemModalOpen] = React.useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isRegisterFormOpen, setIsRegisterFormOpen] = React.useState(false)

  // Login state
  const [loggedIn, setLoggedIn] = React.useState(false)

  const [isTempFahrenheit, setIsTempFahrenheit] = React.useState(true)
  // Clothing items from the api
  const [clothingItems, setClothingItems] = React.useState([])
  // Card item info for the Card that was clicked to open the ItemModal
  const [cardItem, setCardItem] = React.useState({})

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
    api
      .postClothingItem(newItem)
      .then((addedData) => {
        setClothingItems([addedData, ...clothingItems])
        setIsModalFormOpen((prevs) => !prevs)
      })
      .catch((err) => console.log(err))
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
          return item.id !== id
        })
        setClothingItems(newClothingItems)
        handleDeleteModalToggleOpen()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading((prev) => !prev)
      })
  }

  return (
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
  )
}

export default withRouter(App)
