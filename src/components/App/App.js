import React from 'react'
import './App.css'

import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import ItemModal from '../ItemModal/ItemModal'
import { defaultClothingItems } from '../utils/constants'
import { request, weatherDataProcesing } from '../utils/weatherApi'

function App() {
  const [weatherData, setWeatherData] = React.useState({})
  const [isModalFormOpen, setIsModalFormOpen] = React.useState(false)
  const [isItemModalOpen, setIsItemModalOpen] = React.useState(false)

  // Card item info for the ItemModal
  const [cardItem, setCardItem] = React.useState({})

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
        <Header
          handleFormToggleOpen={handleFormToggleOpen}
          name={weatherData.name}
        />
        <Main
          weatherData={weatherData}
          clothingItems={defaultClothingItems}
          handleItemModalToggleOpen={handleItemModalToggleOpen}
        />

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
