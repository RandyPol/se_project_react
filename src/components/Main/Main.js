import React from 'react'
import './Main.css'
import WeatherCard from './WeatherCard/WeatherCard'
import ListItemCard from './ItemCard/ListItemCard'

const Main = ({ weatherData, clothingItems, handleItemModalToggleOpen }) => {
  const filterClothes = clothingItems.filter(
    (item) => item.weather === weatherData.tempDescription
  )

  return (
    <main className="main page__main">
      <section>
        <WeatherCard weatherData={weatherData} />
        <p className="main__todayis-paragraph">
          Today is {weatherData.temp + '\u00B0'}F / You may want to wear:
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
