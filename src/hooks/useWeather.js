import { useState, useEffect } from 'react'
import {
  requestWeatherApiData,
  weatherDataProcesing,
} from '../utils/weatherApi'

export default function useWeather() {
  const [weatherData, setWeatherData] = useState({})

  useEffect(() => {
    requestWeatherApiData()
      .then((data) => {
        const processData = weatherDataProcesing(data)
        setWeatherData(processData)
      })
      .catch((err) => console.log(err))
  }, [])

  return { weatherData }
}
