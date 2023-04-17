import React from 'react'
import './ClothesSection.css'
import ListItemCard from '../../Main/ItemCard/ListItemCard'
// Import the context value
import CurrentTemperatureUnitContext from '../../../contexts/CurrentTemperatureUnitContext'
import CurrentUserContext from '../../../contexts/CurrentUserContext'
const ClothesSection = () => {
  const {
    weatherData,
    handleFormToggleOpen,
    clothingItems,
    handleItemModalToggleOpen,
  } = React.useContext(CurrentTemperatureUnitContext)
  // Get the current user from the context
  const { currentUser } = React.useContext(CurrentUserContext)

  // Filter the clothing items by the current user
  const filteredClothingItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  )

  return (
    <div className="clothessection">
      <div className="clothessection__title-container">
        <h2 className="clothessection__title">Your items</h2>
        <button
          className="clothessection__button-add"
          onClick={handleFormToggleOpen}
        >
          + Add new
        </button>
      </div>
      <ul className="clothessection__card-list">
        {filteredClothingItems.map((item) => (
          <ListItemCard
            key={item._id}
            item={item}
            weather={weatherData.tempDescription}
            handleItemModalToggleOpen={handleItemModalToggleOpen}
          />
        ))}
      </ul>
    </div>
  )
}

export default ClothesSection
