import React from 'react'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import { useFormAndValidation } from '../../hooks/useFormAndValidation'
import CurrentUserContext from '../../contexts/CurrentUserContext'

const EditProfileModal = ({
  isProfileEditFormOpen,
  handleProfileEditModalToggleOpen,
  handleProfileEdit,
}) => {
  const { values, handleChange, errors, isValid, isInputEmpty } =
    useFormAndValidation()

  const { currentUser } = React.useContext(CurrentUserContext)

  // Check if submit button should be disabled
  const isSubmitDisabled = !isValid

  // Handle submit button click
  const handleSubmit = (e) => {
    e.preventDefault()
    handleProfileEdit(values)
  }
  return (
    <ModalWithForm
      title="Change profile data"
      name="updataProfile"
      buttonTextIsLoadingTrue="Saving..."
      buttonTextIsLoadingFalse="Save changes"
      handleFormToggleOpen={handleProfileEditModalToggleOpen}
      handleSubmit={handleSubmit}
      isSubmitDisabled={isSubmitDisabled}
      isOpen={isProfileEditFormOpen}
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
          value={isInputEmpty.name ? '' : values.name || currentUser.name}
          onChange={handleChange}
        />
      </fieldset>
      <fieldset className="form__fieldset">
        <label
          htmlFor="avatar"
          className={errors.avatar ? 'form__label_error' : 'form__label'}
        >
          {errors.avatar ? `Avatar URL: (${errors.avatar})` : 'Avatar URL: '}
        </label>
        <input
          className={`form__input ${errors.avatar && 'form__input-error'}`}
          id="avatar"
          name="avatar"
          type="url"
          placeholder="Avatar URL"
          required
          value={isInputEmpty.avatar ? '' : values.avatar || currentUser.avatar}
          onChange={handleChange}
        />
      </fieldset>
    </ModalWithForm>
  )
}
export default EditProfileModal
