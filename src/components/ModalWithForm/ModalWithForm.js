import React from 'react'
import Popup from '../Popup/Popup'
import './ModalWithForm.css'
// Import the context value
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext'

const ModalWithForm = ({
  title,
  name,
  buttonText,
  handleFormToggleOpen,
  children,
  handleSubmit,
  isSubmitDisabled,
}) => {
  const { isModalFormOpen } = React.useContext(CurrentTemperatureUnitContext)

  return (
    <Popup
      isOpen={isModalFormOpen}
      onClose={handleFormToggleOpen}
      containerName={name}
    >
      <form className="form" name={name} onSubmit={handleSubmit} noValidate>
        <h2 className="form__title">{title}</h2>

        <div className="form__body">{children}</div>

        <fieldset className="form__fieldset">
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={
              isSubmitDisabled
                ? 'form__submit-button_disabled'
                : 'form__submit-button_base'
            }
          >
            {buttonText}
          </button>
        </fieldset>
      </form>
    </Popup>
  )
}

export default ModalWithForm
