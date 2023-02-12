import React from 'react'
// Import the routing components from react-router-dom
import { Route, Switch } from 'react-router-dom'
import './App.css'

// Components
import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import ItemModal from '../ItemModal/ItemModal'
import Profile from '../Profile/Profile'
// Context Data
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext'

// Utils and constants
import { defaultClothingItems } from '../../utils/constants'
import { request, weatherDataProcesing } from '../../utils/weatherApi'

function App() {
  const [weatherData, setWeatherData] = React.useState({})
  const [isModalFormOpen, setIsModalFormOpen] = React.useState(false)
  const [isItemModalOpen, setIsItemModalOpen] = React.useState(false)
  const [isTempFahrenheit, setIsTempFahrenheit] = React.useState(true)

  // Card item info for the ItemModal
  const [cardItem, setCardItem] = React.useState({})

  // Toggle the temperature unit between Fahrenheit and Celsius
  const handleTempUnitToggle = () => {
    setIsTempFahrenheit((prev) => !prev)
  }

  // This is the function to toggle open and close the form modal
  const handleFormToggleOpen = () => {
    setIsModalFormOpen((prevs) => !prevs)
  }
  // Handle the toggle for the ItemModal
  const handleItemModalToggleOpen = (cardInfo) => {
    setCardItem(cardInfo)
    setIsItemModalOpen((prevs) => !prevs)
  }

  React.useEffect(() => {
    request()
      .then((data) => {
        // Update the weather data in the state after processing the data
        const processData = weatherDataProcesing(data)
        setWeatherData(processData)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className="page">
      <div className="page__container">
        <CurrentTemperatureUnitContext.Provider
          value={{
            weatherData,
            defaultClothingItems,
            isTempFahrenheit,
            handleTempUnitToggle,
            handleFormToggleOpen,
            handleItemModalToggleOpen,
          }}
        >
          <Header />
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        </CurrentTemperatureUnitContext.Provider>

        <Footer />
        {isModalFormOpen && (
          <ModalWithForm
            title="New garment"
            name="addGarment"
            buttonText="Add garment"
            handleFormToggleOpen={handleFormToggleOpen}
          >
            <fieldset className="form__fieldset">
              <label className="form__label" htmlFor="name">
                Name
              </label>
              <input
                className="form__input"
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                minLength={3}
                required
              />
            </fieldset>
            <fieldset className="form__fieldset">
              <label className="form__label" htmlFor="image">
                Image URL
              </label>
              <input
                className="form__input"
                type="url"
                id="image"
                name="image"
                placeholder="Image URL"
                required
              />
            </fieldset>
            <fieldset className="form__fieldset">
              <p className="form__radio-group-title">
                Select the weather type:
              </p>
              <div className="form__radio-group">
                <input
                  className="form__input-radio"
                  type="radio"
                  id="hot"
                  name="weather"
                  value="Hot"
                  required
                />
                <label className="form__label-radio" htmlFor="hot">
                  Hot
                </label>
              </div>
              <div className="form__radio-group">
                <input
                  className="form__input-radio"
                  type="radio"
                  id="warm"
                  name="weather"
                  value="Warm"
                  required
                />
                <label className="form__label-radio" htmlFor="warm">
                  Warm
                </label>
              </div>
              <div className="form__radio-group">
                <input
                  className="form__input-radio"
                  type="radio"
                  id="cold"
                  name="weather"
                  value="Cold"
                  required
                />
                <label className="form__label-radio" htmlFor="cold">
                  Cold
                </label>
              </div>
            </fieldset>
          </ModalWithForm>
        )}
        {isItemModalOpen && (
          <ItemModal
            handleItemModalToggleOpen={handleItemModalToggleOpen}
            name={'image'}
            cardItem={cardItem}
          />
        )}
      </div>
    </div>
  )
}

export default App
