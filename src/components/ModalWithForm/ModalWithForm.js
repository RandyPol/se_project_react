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
  const handleSubmit = (e) => {
    e.preventDefault()
    // Perform submit action with inputValues
    setInputValues({ name: '', image: '', weather: '' })
    console.log(inputValues)
    handleFormToggleOpen()
  }

  return (
    <div className={`modal modal_type_${name}`}>
      <form
        className="form modal__container"
        name={name}
        onSubmit={handleSubmit}
      >
        {/* <div className="form__header"> */}
        <h2 className="form__title">{title}</h2>
        <button
          type="button"
          className="form__close-button"
          onClick={handleFormToggleOpen}
        >
          <img className="form__close-icon" src={closeIcon} alt="Close icon" />
        </button>
        {/* </div> */}
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
