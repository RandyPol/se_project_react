import React from 'react'
import './App.css'
// import '../../fonts/fonts.css'

import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
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
        <Main weatherData={weatherData} clothingItems={defaultClothingItems} />

        <Footer />
        {isModalFormOpen && (
          <ModalWithForm
            title="New garment"
            name="addGarment"
            buttonText="Add garment"
            handleFormToggleOpen={handleFormToggleOpen}
            inputValues={inputValues}
            setInputValues={setInputValues}
          >
            <div className="modal__body">
              <fieldset className="modal__form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={inputValues.name}
                  onChange={handleInputChange}
                  required
                />
              </fieldset>
              <fieldset className="modal__form-group">
                <label htmlFor="image">Image URL</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={inputValues.image}
                  onChange={handleInputChange}
                  required
                />
              </fieldset>
              <fieldset className="modal__form-group">
                <p>Select the weather type:</p>
                <label htmlFor="hot">Hot</label>
                <input
                  type="radio"
                  id="hot"
                  name="weather"
                  value="Hot"
                  checked={inputValues.weather === 'Hot'}
                  onChange={handleInputChange}
                />
                <label htmlFor="warm">Warm</label>
                <input
                  type="radio"
                  id="warm"
                  name="weather"
                  value="Warm"
                  checked={inputValues.weather === 'Warm'}
                  onChange={handleInputChange}
                />
                <label htmlFor="cold">Cold</label>
                <input
                  type="radio"
                  id="cold"
                  name="weather"
                  value="Cold"
                  checked={inputValues.weather === 'Cold'}
                  onChange={handleInputChange}
                />
              </fieldset>
            </div>
          </ModalWithForm>
        )}
        {/* <ModalWithForm />
      <ItemModal /> */}
      </div>
    </div>
  )
}

export default App
