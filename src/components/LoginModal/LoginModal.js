import React from 'react'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import { useFormAndValidation } from '../../hook/useFormAndValidation'

function LoginModal({
  isLoading,
  isLoginFormOpen,
  handleLoginModalToggleOpen,
  handleLogin,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation()

  // Check if submit button should be disabled
  const isSubmitDisabled = !isValid

  // Handle Submit Button
  function handleSubmit(e) {
    e.preventDefault()
    handleLogin(values)
    resetForm()
  }
  return (
    <ModalWithForm
      title="Log in"
      name="login"
      buttonText={isLoading ? 'Logging in...' : 'Log in'}
      handleFormToggleOpen={handleLoginModalToggleOpen}
      handleSubmit={handleSubmit}
      isSubmitDisabled={isSubmitDisabled}
      isOpen={isLoginFormOpen}
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
    </ModalWithForm>
  )
}

export default LoginModal
