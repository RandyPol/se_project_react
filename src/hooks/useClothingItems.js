import { useState, useEffect } from 'react'
import api from '../utils/api'

export default function useClothingItems() {
  const [clothingItems, setClothingItems] = useState([])

  useEffect(() => {
    api
      .getInitialClothingItems()
      .then((data) => {
        setClothingItems(data)
      })
      .catch((err) => console.log(err))
  }, [])

  return { clothingItems, setClothingItems }
}
