import React from 'react'
import './Main.css'
import WeatherCard from './WeatherCard/WeatherCard'
import ListItemCard from './ItemCard/ListItemCard'
// Import the context value
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext'

const Main = () => {
  const {
    weatherData,
    isTempFahrenheit,
    defaultClothingItems,
    handleItemModalToggleOpen,
  } = React.useContext(CurrentTemperatureUnitContext)
  const filterClothes = defaultClothingItems.filter(
    (item) => item.weather === weatherData.tempDescription
  )

  return (
    <main className="main page__main">
      <section>
        <WeatherCard />
        <p className="main__todayis-paragraph">
          Today is{' '}
          {isTempFahrenheit
            ? `${weatherData.temp}\u00B0F`
            : `${weatherData.tempCel}\u00B0C`}{' '}
          / You may want to wear:
        </p>
        <ul className="main__card-list">
          {filterClothes.map((item) => (
            <ListItemCard
              key={item._id}
              item={item}
              weather={weatherData.tempDescription}
              handleItemModalToggleOpen={handleItemModalToggleOpen}
            />
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Main
