import { useState, useCallback } from 'react'

export function useFormAndValidation() {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)
  const [isInputEmpty, setIsInputEmpty] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
    setErrors({ ...errors, [name]: e.target.validationMessage })
    setIsValid(e.target.closest('form').checkValidity())
    setIsInputEmpty((prev) => ({ ...prev, [name]: value === '' }))
  }

  const resetForm = useCallback(
    (
      newValues = {},
      newErrors = {},
      newIsValid = false,
      newIsInputEmpty = {}
    ) => {
      setValues(newValues)
      setErrors(newErrors)
      setIsValid(newIsValid)
      setIsInputEmpty(newIsInputEmpty)
    },
    [setValues, setErrors, setIsValid, setIsInputEmpty]
  )

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
    isInputEmpty,
  }
}
