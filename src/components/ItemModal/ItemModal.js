import React from 'react'
import Popup from '../Popup/Popup'
import './ItemModal.css'
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext'

const ItemModal = ({
  name,
  cardItem,
  handleItemModalToggleOpen,
  handleDeleteModalToggleOpen,
}) => {
  const { isItemModalOpen } = React.useContext(CurrentTemperatureUnitContext)

  const handleDeleteButtonClick = () => {
    handleItemModalToggleOpen(cardItem)
    handleDeleteModalToggleOpen()
  }

  return (
    <Popup
      isOpen={isItemModalOpen}
      onClose={handleItemModalToggleOpen}
      containerName={name}
    >
      <img
        className="modal__card-image"
        src={cardItem.imageUrl}
        alt={cardItem.name}
      ></img>
      <div className="modal__card-info-container">
        <div className="modal__title-weather-container">
          <p className="modal__card-paragraphs">{cardItem.name}</p>
          <p className="modal__card-paragraphs">Weather: {cardItem.weather}</p>
        </div>
        <button
          type="button"
          className="modal__delete-button"
          onClick={handleDeleteButtonClick}
        >
          Delete item
        </button>
      </div>
    </Popup>
  )
}

export default ItemModal
