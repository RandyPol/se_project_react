import React from 'react'
import Popup from '../Popup/Popup'
import './DeleteConfirmationModal.css'

const DeleteConfirmationModal = ({
  name,
  isLoading,
  isDeleteModalOpen,
  cardItem,
  handleCardDelete,
  handleDeleteModalToggleOpen,
}) => {
  // Handle click for delete button to open confirmation modal and
  // close item modal
  const handleDeleteButtonClick = () => {
    handleCardDelete(cardItem.id)
  }

  return (
    <Popup
      isOpen={isDeleteModalOpen}
      onClose={handleDeleteModalToggleOpen}
      containerName={name}
    >
      <p className="modal__delete-message">
        Are you sure you want to delete this item? This action is irreversible.
      </p>

      {isLoading ? (
        <button type="button" className="modal__delete-confirm">
          Deleting...
        </button>
      ) : (
        <>
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
        </>
      )}
    </Popup>
  )
}

export default DeleteConfirmationModal
