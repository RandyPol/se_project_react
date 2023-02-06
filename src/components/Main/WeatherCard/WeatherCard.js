import React, { useState, useEffect } from 'react'

const backgroundColors = {
  Clear: {
    day: '#00A3FF',
    night: '#286897',
    dayIcon: 'clearDay',
    nightIcon: 'clearNight',
  },
  Clouds: {
    day: '#00A3FF',
    night: '#286897',
    dayIcon: 'cloudsDay',
    nightIcon: 'cloudsNight',
  },
  Rain: {
    day: '#6CA6C7',
    night: '#286897',
    dayIcon: 'rainDay',
    nightIcon: 'rainNight',
  },
  Thunderstorm: {
    day: '#6CA6C7',
    night: '#286897',
    dayIcon: 'stormDay',
    nightIcon: 'stormNight',
  },
  Snow: {
    day: '#6CA6C7',
    night: '#286897',
    dayIcon: 'snowDay',
    nightIcon: 'snowNight',
  },
  Fog: {
    day: '#6CA6C7',
    night: '#286897',
    dayIcon: 'fogDay',
    nightIcon: 'fogNight',
  },
}

const WeatherCard = ({ weatherData }) => {
  const [icon, setIcon] = useState(null)
  const timeOfDay = weatherData?.timeOfDay
  const weather = weatherData?.main

  // Set the background color and icon based on the weather and time of day
  const backgroundColor = backgroundColors[weather]?.[timeOfDay]

  useEffect(() => {
    import(
      `../../../images/weatherIcons/${
        backgroundColors[weather]?.[`${timeOfDay}Icon`]
      }.svg`
    )
      .then((icon) => {
        setIcon(icon.default)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [timeOfDay, weather])

  return (
    <div
      className="main__temp-background"
      style={{
        backgroundColor,
        backgroundImage: `url(${icon})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right',
      }}
    >
      <h2 className="main__temp-heading">{weatherData.temp + '\u00B0'}F</h2>
    </div>
  )
}

export default WeatherCard
