import React from 'react'
import './ModalWithForm.css'
import closeIcon from '../../images/CloseModalIcon.svg'
import LabelWithError from './LabelWithError/LabelWithError'

const ModalWithForm = ({
  title,
  name,
  buttonText,
  handleFormToggleOpen,
  children,
}) => {
  const [inputValues, setInputValues] = React.useState({
    name: '',
    image: '',
    weather: '',
  })
  const [validity, setValidity] = React.useState({})

  // Check the inputValues and the validity to see if the submit button should be disabled
  const isSubmitDisabled = () => {
    const isInputValueEmpty = Object.values(inputValues).some(
      (inputValue) => inputValue === ''
    )

    const validityEmpty = Object.values(validity).some((validity) => {
      return validity.valid === false
    })

    return isInputValueEmpty || validityEmpty
  }

  // This is the function to handle the input changes for the modal form
  const handleInputChange = (e) => {
    let input = e.target
    let id = input.id
    setInputValues({
      ...inputValues,
      [input.name]: input.value,
    })
    // console.log(input.validity.valid)
    if (input.validity.valid) {
      // console.log('Updated the validity is not valid')
      setValidity({ ...validity, [id]: { valid: true, message: '' } })
    } else {
      // console.log('Updated the validity')
      setValidity({
        ...validity,
        [id]: { valid: false, message: input.validationMessage },
      })
    }
  }

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
    document.addEventListener('mousedown', handleClickOutsideForm)

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideForm)
    }
  }, [handleFormToggleOpen])

  // Function to handle the children type passed by the App component
  const handleChild = (child) => {
    if (child.type === 'input') {
      let id = child.props.id
      if (child.props.type === 'radio') {
        return React.cloneElement(child, {
          onChange: handleInputChange,
          checked: inputValues.weather === child.props.value,
        })
      }
      return React.cloneElement(child, {
        onChange: handleInputChange,
        value: inputValues[id],
        className:
          validity[id] && !validity[id].valid
            ? 'form__input form__input-error'
            : 'form__input',
      })
    } else if (child.type === 'label') {
      return (
        <LabelWithError
          htmlFor={child.props.htmlFor}
          validity={validity}
          textContent={child.props.children}
          labelClassName={child.props.className}
        />
      )
    } else if (child.props && child.props.children) {
      let children = React.Children.map(child.props.children, handleChild)
      return React.cloneElement(child, { children })
    } else {
      return child
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Perform submit action with inputValues
    console.log(inputValues)
    console.log(validity)
    // handleFormToggleOpen()
  }

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
