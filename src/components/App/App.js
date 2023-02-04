import React from 'react'
import './App.css'
// import '../../fonts/fonts.css'

import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import ItemModal from '../ItemModal/ItemModal'
import { defaultClothingItems } from '../utils/constants'
import { request, weatherDataProcesing } from '../utils/weatherApi'
// import ModalWithForm from '../ModalWithForm/ModalWithForm'
// import ItemModal from '../ItemModal/ItemModal'

function App() {
  const [weatherData, setWeatherData] = React.useState({})
  const [inputValues, setInputValues] = React.useState({
    name: '',
    image: '',
    weather: '',
  })
  const [isModalFormOpen, setIsModalFormOpen] = React.useState(false)
  const [isItemModalOpen, setIsItemModalOpen] = React.useState(false)

  // Card item info for the ItemModal
  const [cardItem, setCardItem] = React.useState({})

  // This is the function to handle the input changes for the modal form
  const handleInputChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    })
  }

  // This is the function to toggle open and close the form modal
  const handleFormToggleOpen = () => {
    setIsModalFormOpen((prevs) => !prevs)
    setInputValues({ name: '', image: '', weather: '' })
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
        console.log(JSON.stringify(data, null, 2))
        const processData = weatherDataProcesing(data)
        setWeatherData(processData)
        // console.log(JSON.stringify(processData, null, 2))
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
            inputValues={inputValues}
          >
            <div className="form__body">
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
                  value={inputValues.name}
                  onChange={handleInputChange}
                  required
                />
              </fieldset>
              <fieldset className="form__fieldset">
                <label className="form__label" htmlFor="image">
                  Image URL
                </label>
                <input
                  className="form__input"
                  type="text"
                  id="image"
                  name="image"
                  placeholder="Image URL"
                  value={inputValues.image}
                  onChange={handleInputChange}
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
                    checked={inputValues.weather === 'Hot'}
                    onChange={handleInputChange}
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
                    checked={inputValues.weather === 'Warm'}
                    onChange={handleInputChange}
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
                    checked={inputValues.weather === 'Cold'}
                    onChange={handleInputChange}
                  />
                  <label className="form__label-radio" htmlFor="cold">
                    Cold
                  </label>
                </div>
              </fieldset>
            </div>
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
