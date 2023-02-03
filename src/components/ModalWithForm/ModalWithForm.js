import React from 'react'
import './ModalWithForm.css'
import closeIcon from '../../images/CloseModalIcon.svg'

const ModalWithForm = ({
  title,
  name,
  buttonText,
  handleFormToggleOpen,
  children,
  inputValues,
  setInputValues,
}) => {
  // Handle the escape key to close the modal
  React.useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        handleFormToggleOpen()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleFormToggleOpen])

  // Handle clicking outside the form to close the modal
  React.useEffect(() => {
    const handleClickOutsideForm = (event) => {
      if (event.target.classList.contains(`modal`)) {
        handleFormToggleOpen()
      }
    }
    document.addEventListener('click', handleClickOutsideForm)

    return () => {
      document.removeEventListener('click', handleClickOutsideForm)
    }
  }, [handleFormToggleOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Perform submit action with inputValues
    console.log(inputValues)
    setInputValues({ name: '', image: '', weather: '' })
    handleFormToggleOpen()
  }

  return (
    <div className={`modal modal_type_${name}`}>
      <form
        className="form modal__container"
        name={name}
        onSubmit={handleSubmit}
      >
        <h2 className="form__title">{title}</h2>
        <button
          type="button"
          className="form__close-button"
          onClick={handleFormToggleOpen}
        >
          <img className="form__close-icon" src={closeIcon} alt="Close icon" />
        </button>

        {children}
        <fieldset className="form__fieldset">
          <button type="submit" className="form__submit-button">
            {buttonText}
          </button>
        </fieldset>
      </form>
    </div>
  )
}

export default ModalWithForm
