import React from 'react'
import Popup from '../Popup/Popup'
import './ModalWithForm.css'
import CurrentUserContext from '../../contexts/CurrentUserContext'

const ModalWithForm = ({
  title,
  name,
  buttonText,
  handleFormToggleOpen,
  children,
  handleSubmit,
  isSubmitDisabled,
  handleOrButtonClick,
  isOpen,
}) => {
  const { currentUser } = React.useContext(CurrentUserContext)

  return (
    <Popup isOpen={isOpen} onClose={handleFormToggleOpen} containerName={name}>
      <form className="form" name={name} onSubmit={handleSubmit} noValidate>
        <h2 className="form__title">{title}</h2>

        <div className="form__body">{children}</div>
        {currentUser._id ? (
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
        ) : (
          <fieldset className="form__fieldset">
            <div>
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
              <button
                type="button"
                className="form__submit-orButton"
                onClick={handleOrButtonClick}
              >
                {buttonText === 'Next' ? 'or Log in' : 'or Register'}
              </button>
            </div>
          </fieldset>
        )}
      </form>
    </Popup>
  )
}

export default ModalWithForm
