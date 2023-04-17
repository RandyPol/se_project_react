import React from 'react'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import { useFormAndValidation } from '../../hook/useFormAndValidation'

const RegisterModal = ({
  isLoading,
  handleRegisterModalToggleOpen,
  isRegisterFormOpen,
  handleRegister,
}) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation()

  // Check if submit button should be disabled
  const isSubmitDisabled = !isValid

  // Handle submit button click
  const handleSubmit = (e) => {
    e.preventDefault()
    handleRegister(values)
    resetForm()
  }

  return (
    <ModalWithForm
      title="Sign up"
      name="register"
      buttonText={isLoading ? 'Registering...' : 'Next'}
      handleFormToggleOpen={handleRegisterModalToggleOpen}
      handleSubmit={handleSubmit}
      isSubmitDisabled={isSubmitDisabled}
      isOpen={isRegisterFormOpen}
    >
      <fieldset className="form__fieldset">
        <label
          htmlFor="email"
          className={errors.email ? 'form__label_error' : 'form__label'}
        >
          {errors.email ? `Email: (${errors.email})` : 'Email: '}
        </label>
        <input
          className={`form__input ${errors.email && 'form__input-error'}`}
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
          minLength="2"
          maxLength="30"
          value={values.email || ''}
          onChange={handleChange}
        />
      </fieldset>
      <fieldset className="form__fieldset">
        <label
          htmlFor="password"
          className={errors.password ? 'form__label_error' : 'form__label'}
        >
          {errors.password ? `Password: (${errors.password})` : 'Password: '}
        </label>
        <input
          className={`form__input ${errors.password && 'form__input-error'}`}
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          required
          minLength="9"
          maxLength="20"
          value={values.password || ''}
          onChange={handleChange}
        />
      </fieldset>
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
          value={values.avatar || ''}
          onChange={handleChange}
        />
      </fieldset>
    </ModalWithForm>
  )
}

export default RegisterModal
