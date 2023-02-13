import React from 'react'
import './ClothesSection.css'
import ListItemCard from '../../Main/ItemCard/ListItemCard'
// Import the context value
import CurrentTemperatureUnitContext from '../../../contexts/CurrentTemperatureUnitContext'
const ClothesSection = () => {
  const {
    weatherData,
    handleFormToggleOpen,
    defaultClothingItems,
    handleItemModalToggleOpen,
  } = React.useContext(CurrentTemperatureUnitContext)
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
        {defaultClothingItems.map((item) => (
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
