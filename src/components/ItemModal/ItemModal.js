import React from 'react'
import './ItemModal.css'
import closeIcon from '../../images/CloseModalIcon.svg'

const ItemModal = ({
  name,
  cardItem,
  handleItemModalToggleOpen,
  handleDeleteModalToggleOpen,
}) => {
  // Handle the escape key to close the modal
  React.useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        handleItemModalToggleOpen()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleItemModalToggleOpen])

  // Handle clicking outside the form to close the modal
  React.useEffect(() => {
    const handleClickOutsideForm = (event) => {
      if (event.target.classList.contains(`modal`)) {
        handleItemModalToggleOpen()
      }
    }
    document.addEventListener('mousedown', handleClickOutsideForm)

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideForm)
    }
  }, [handleItemModalToggleOpen])

  // Handle click for delete button to open confirmation modal and
  // close item modal
  const handleDeleteButtonClick = () => {
    handleItemModalToggleOpen(cardItem)
    handleDeleteModalToggleOpen()
  }

  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__item-container">
        <button
          type="button"
          className="modal__close-button"
          onClick={handleItemModalToggleOpen}
        >
          <img className="modal__close-icon" src={closeIcon} alt="Close icon" />
        </button>
        <img
          className="modal__card-image"
          src={cardItem.imageUrl}
          alt={cardItem.name}
        ></img>
        <div className="modal__card-info-container">
          <div className="modal__title-weather-container">
            <p className="modal__card-paragraphs">{cardItem.name}</p>
            <p className="modal__card-paragraphs">
              Weather: {cardItem.weather}
            </p>
          </div>
          <button
            type="button"
            className="modal__delete-button"
            onClick={handleDeleteButtonClick}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  )
}

export default ItemModal
