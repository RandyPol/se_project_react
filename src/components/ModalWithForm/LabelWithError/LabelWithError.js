import React from 'react'

const LabelWithError = ({ htmlFor, validity, textContent, labelClassName }) => {
  return (
    <>
      {validity[htmlFor] && !validity[htmlFor].valid ? (
        <label className="form__label_error" htmlFor={htmlFor}>
          {`${textContent}:  (${validity[htmlFor].message})`}
        </label>
      ) : (
        <label className={labelClassName} htmlFor={htmlFor}>
          {textContent}
        </label>
      )}
    </>
  )
}

export default LabelWithError
