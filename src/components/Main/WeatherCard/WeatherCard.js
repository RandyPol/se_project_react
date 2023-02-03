import React from 'react'

const WeatherCard = ({ temp }) => {
  return (
    <div className="main__temp-background">
      <h2 className="main__temp-heading">{temp}F</h2>
    </div>
  )
}

export default WeatherCard
