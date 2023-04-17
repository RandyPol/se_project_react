import React from 'react'
import Popup from '../Popup/Popup'
import './ItemModal.css'
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext'
import CurrentUserContext from '../../contexts/CurrentUserContext'
const ItemModal = ({
  name,
  cardItem,
  handleItemModalToggleOpen,
  handleDeleteModalToggleOpen,
}) => {
  const { isItemModalOpen } = React.useContext(CurrentTemperatureUnitContext)
  const {currentUser} = React.useContext(CurrentUserContext)
  // Checking if the current user is the owner of the current clothing item
  const isOwn = cardItem.owner === currentUser._id
  // Creating a variable which set in `className` for the delete button
  const itemDeleteButtonClassName = `modal__delete-button ${
    isOwn ? 'modal__delete-button_visible' : 'modal__delete-button_hidden'
  }`

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
          className={itemDeleteButtonClassName}
          onClick={handleDeleteButtonClick}
        >
          Delete item
        </button>
      </div>
    </Popup>
  )
}

export default ItemModal
