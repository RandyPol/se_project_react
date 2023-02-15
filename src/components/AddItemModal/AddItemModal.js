import React from 'react'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import { useFormAndValidation } from '../../hook/useFormAndValidation'

const AddItemModal = ({ isLoading, onAddItem, handleFormToggleOpen }) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation()

  React.useEffect(() => {
    // Handle the escape key to close the modal
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        handleFormToggleOpen()
      }
    }
    // Handle clicking outside the form to close the modal
    const handleClickOutsideForm = (event) => {
      if (event.target.classList.contains(`modal`)) {
        handleFormToggleOpen()
      }
    }
    // Add event listeners for the escape key and clicking outside the form
    document.addEventListener('keydown', handleKeyPress)
    document.addEventListener('mousedown', handleClickOutsideForm)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
      document.removeEventListener('mousedown', handleClickOutsideForm)
    }
  }, [handleFormToggleOpen])

  // Check if submit button should be disabled
  const isSubmitDisabled = !isValid

  // Handle submit button click
  const handleSubmit = (e) => {
    e.preventDefault()
    onAddItem(values)
    resetForm()
  }

  return (
    <ModalWithForm
      title="New garment"
      name="addGarment"
      buttonText={isLoading ? 'Saving...' : 'Add garment'}
      handleFormToggleOpen={handleFormToggleOpen}
      handleSubmit={handleSubmit}
      isSubmitDisabled={isSubmitDisabled}
    >
      <fieldset className="form__fieldset">
        <label
          htmlFor="name"
          className={errors.name ? 'form__label_error' : 'form__label'}
        >
          {errors.name ? `Name: (${errors.name})` : 'Name: '}
        </label>
        <input
          className={`form__input ${errors.name && 'form__input-error'}`}
          id="name"
          name="name"
          type="text"
          placeholder="Enter the name"
          required
          minLength="2"
          maxLength="30"
          value={values.name || ''}
          onChange={handleChange}
        />
      </fieldset>
      <fieldset className="form__fieldset">
        <label
          htmlFor="imageUrl"
          className={errors.imageUrl ? 'form__label_error' : 'form__label'}
        >
          {errors.imageUrl ? `Image URL: (${errors.imageUrl})` : 'Image URL: '}
        </label>

        <input
          className={`form__input ${errors.imageUrl && 'form__input-error'}`}
          id="imageUrl"
          name="imageUrl"
          type="url"
          placeholder="Enter the image URL"
          required
          value={values.imageUrl || ''}
          onChange={handleChange}
        />
      </fieldset>

      <fieldset className="form__fieldset">
        <legend
          className={errors.weather ? 'form__label_error' : 'form__label'}
        >
          {errors.weather
            ? `Select the weather type: (${errors.weather})`
            : ' Select the weather type:'}
        </legend>

        <div className="form__radio-group">
          <input
            className={`form__input-radio`}
            id="hot"
            name="weather"
            type="radio"
            value="hot"
            required
            checked={values.weather === 'hot'}
            onChange={handleChange}
          />
          <label className="form__label-radio" htmlFor="hot">
            Hot
          </label>
        </div>

        <div className="form__radio-group">
          <input
            className={`form__input-radio`}
            id="warm"
            name="weather"
            type="radio"
            value="warm"
            required
            checked={values.weather === 'warm'}
            onChange={handleChange}
          />
          <label className="form__label-radio" htmlFor="warm">
            Warm
          </label>
        </div>

        <div className="form__radio-group">
          <input
            className={`form__input-radio`}
            id="cold"
            name="weather"
            type="radio"
            value="cold"
            required
            checked={values.weather === 'cold'}
            onChange={handleChange}
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
