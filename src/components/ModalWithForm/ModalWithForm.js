import React from 'react'
import './ModalWithForm.css'

const ModalWithForm = ({
  title,
  name,
  buttonText,
  handleFormToggleOpen,
  children,
  inputValues,
  setInputValues,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    // Perform submit action with inputValues
    setInputValues({ name: '', image: '', weather: '' })
    console.log(inputValues)
    handleFormToggleOpen()
  }

  return (
    <div className={`modal modal_type_${name}`}>
      <form name={name} onSubmit={handleSubmit}>
        <div className="modal__header">
          <h2 className="modal__title">{title}</h2>
          <button
            type="button"
            className="modal__close-button"
            onClick={handleFormToggleOpen}
          >
            ×
          </button>
        </div>
        {children}
        <fieldset className="modal__form-group">
          <button type="submit" className="modal__submit-button">
            {buttonText}
          </button>
        </fieldset>
      </form>
    </div>
  )
}

export default ModalWithForm
