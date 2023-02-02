import React from 'react'
import './App.css'

import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import { defaultClothingItems } from '../utils/constants'
import { request, weatherDataProcesing } from '../utils/weatherApi'
// import ModalWithForm from '../ModalWithForm/ModalWithForm'
// import ItemModal from '../ItemModal/ItemModal'

function App() {
  const [weatherData, setWeatherData] = React.useState({})

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
      <Header name={weatherData.name} />
      <Main weatherData={weatherData} clothingItems={defaultClothingItems} />

      <Footer />
      {/* <ModalWithForm />
      <ItemModal /> */}
    </div>
  )
}

export default App
