import React from 'react'
import './ItemModal.css'
import closeIcon from '../../images/CloseModalIcon.svg'

const ItemModal = ({ name, cardItem, handleItemModalToggleOpen }) => {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__container">
        <button
          type="button"
          className="modal__close-button"
          onClick={handleItemModalToggleOpen}
        >
          <img className="modal__close-icon" src={closeIcon} alt="Close icon" />
        </button>
        <img
          className="modal__card-image"
          src={cardItem.link}
          alt={cardItem.name}
        ></img>
        <div className="modal__title-weather-container">
          <p className="modal__card-paragraphs">{cardItem.name}</p>
          <p className="modal__card-paragraphs">Weather: {cardItem.weather}</p>
        </div>
      </div>
    </div>
  )
}

export default ItemModal
