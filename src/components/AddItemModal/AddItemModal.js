import React from 'react'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import LabelWithError from '../ModalWithForm/LabelWithError/LabelWithError'

// onAddItem refers to handleAddItemSubmit, which is declared in App.js
const AddItemModal = ({ onAddItem, handleFormToggleOpen }) => {
  const [inputValues, setInputValues] = React.useState({
    name: '',
    imageUrl: '',
    weather: '',
  })
  const [validity, setValidity] = React.useState({})

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
    onAddItem(inputValues)
    handleFormToggleOpen()
  }

  return (
    <ModalWithForm
      title="New garment"
      name="addGarment"
      buttonText="Add garment"
      handleFormToggleOpen={handleFormToggleOpen}
      handleSubmit={handleSubmit}
      isSubmitDisabled={isSubmitDisabled}
      handleChild={handleChild}

    >
      <fieldset className="form__fieldset">
        <label className="form__label" htmlFor="name">
          Name
        </label>
        <input
          className="form__input"
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          minLength={3}
          required
        />
      </fieldset>
      <fieldset className="form__fieldset">
        <label className="form__label" htmlFor="imageUrl">
          Image URL
        </label>
        <input
          className="form__input"
          type="url"
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          required
        />
      </fieldset>
      <fieldset className="form__fieldset">
        <p className="form__radio-group-title">Select the weather type:</p>
        <div className="form__radio-group">
          <input
            className="form__input-radio"
            type="radio"
            id="hot"
            name="weather"
            value="hot"
            required
          />
          <label className="form__label-radio" htmlFor="hot">
            Hot
          </label>
        </div>
        <div className="form__radio-group">
          <input
            className="form__input-radio"
            type="radio"
            id="warm"
            name="weather"
            value="warm"
            required
          />
          <label className="form__label-radio" htmlFor="warm">
            Warm
          </label>
        </div>
        <div className="form__radio-group">
          <input
            className="form__input-radio"
            type="radio"
            id="cold"
            name="weather"
            value="cold"
            required
          />
          <label className="form__label-radio" htmlFor="cold">
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  )
}

export default AddItemModal
