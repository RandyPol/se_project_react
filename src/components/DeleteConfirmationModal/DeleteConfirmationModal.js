import React from 'react'
import './DeleteConfirmationModal.css'
import closeIcon from '../../images/CloseModalIcon.svg'

const DeleteConfirmationModal = ({
  cardItem,
  handleCardDelete,
  handleDeleteModalToggleOpen,
}) => {
  // Handle the escape key to close the modal
  React.useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        handleDeleteModalToggleOpen()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleDeleteModalToggleOpen])

  // Handle clicking outside the form to close the modal
  React.useEffect(() => {
    const handleClickOutsideForm = (event) => {
      if (event.target.classList.contains(`modal`)) {
        handleDeleteModalToggleOpen()
      }
    }
    document.addEventListener('mousedown', handleClickOutsideForm)

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideForm)
    }
  }, [handleDeleteModalToggleOpen])
  // Handle click for delete button to open confirmation modal and
  // close item modal
  const handleDeleteButtonClick = () => {
    handleCardDelete(cardItem.id)
    handleDeleteModalToggleOpen()
  }

  return (
    <div className="modal">
      <div className="modal__delete-container">
        <button
          type="button"
          className="modal__close-button"
          onClick={handleDeleteModalToggleOpen}
        >
          <img className="modal__close-icon" src={closeIcon} alt="Close icon" />
        </button>
        <p className="modal__delete-message">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>

        <button
          type="button"
          className="modal__delete-confirm"
          onClick={handleDeleteButtonClick}
        >
          Yes, delete item
        </button>
        <button
          type="button"
          className="modal__delete-cancel"
          onClick={handleDeleteModalToggleOpen}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default DeleteConfirmationModal
