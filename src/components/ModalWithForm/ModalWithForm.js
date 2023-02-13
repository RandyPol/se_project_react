import React from 'react'
import './ModalWithForm.css'
import closeIcon from '../../images/CloseModalIcon.svg'

const ModalWithForm = ({
  title,
  name,
  buttonText,
  handleFormToggleOpen,
  children,
  handleSubmit,
  handleChild,
  isSubmitDisabled,
}) => {
  return (
    <div className={`modal modal_type_${name}`}>
      <form
        className="form modal__container"
        name={name}
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className="form__title">{title}</h2>
        <button
          type="button"
          className="form__close-button"
          onClick={handleFormToggleOpen}
        >
          <img className="form__close-icon" src={closeIcon} alt="Close icon" />
        </button>

        <div className="form__body">
          {/* Children represent the list of inputs given by the App/parent component */}
          {React.Children.map(children, handleChild)}
        </div>

        <fieldset className="form__fieldset">
          <button
            type="submit"
            disabled={isSubmitDisabled()}
            className={
              isSubmitDisabled()
                ? 'form__submit-button_disabled'
                : 'form__submit-button_base'
            }
          >
            {buttonText}
          </button>
        </fieldset>
      </form>
    </div>
  )
}

export default ModalWithForm
