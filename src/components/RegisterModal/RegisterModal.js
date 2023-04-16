import React from 'react'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import { useFormAndValidation } from '../../hook/useFormAndValidation'

const RegisterModal = ({ isLoading, handleRegisterModalToggleOpen }) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation()

  React.useEffect(() => {
    // Handle the escape key to close the modal
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        handleRegisterModalToggleOpen()
      }
    }
    // Handle clicking outside the form to close the modal
    const handleClickOutsideForm = (event) => {
      if (event.target.classList.contains(`modal`)) {
        handleRegisterModalToggleOpen()
      }
    }
    // Add event listeners for the escape key and clicking outside the form
    document.addEventListener('keydown', handleKeyPress)
    document.addEventListener('mousedown', handleClickOutsideForm)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
      document.removeEventListener('mousedown', handleClickOutsideForm)
    }
  }, [handleRegisterModalToggleOpen])

  return <div>RegisterModal</div>
}

export default RegisterModal
