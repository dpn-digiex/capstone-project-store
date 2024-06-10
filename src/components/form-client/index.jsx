'use client'
import React, { useState } from 'react'
import { MdOutlineReportProblem } from 'react-icons/md'
import clsx from 'clsx'

import { getType, validateInput } from '@/utils'
import { ValidationError } from '@/utils/errors'

import styles from './index.module.css'

const FormClient = ({ children, className, validate, defaultValidate = false, onSubmit, header, footer, ...props }) => {
  // [STATES]
  const [errorList, setErrorList] = useState([])

  // [HANDLER FUNCTIONS]
  const handleValidateForm = (e) => {
    if (!validate) return true
    setErrorList(
      Array.from(e.target).map((formControl) => {
        if (!formControl.required) return null
        const validateResult = validateInput(formControl)
        if (getType(validateResult) === 'error') return validateResult.message
        return validateResult
      })
    )
    if (errorList.length > 0) {
      if (errorList.every((error) => error === null)) return true
    }
    return false
  }

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault()
      const isValidate = handleValidateForm(e)
      if (!isValidate) throw new ValidationError('form-submit', 'Invalid form data')
      await onSubmit(e)
    } catch (error) {
      console.log(error.message)
    }
  }

  // [RENDER]
  return (
    <form
      autoComplete='off'
      noValidate={!defaultValidate}
      className={clsx(styles.form, className)}
      {...props}
      onSubmit={handleSubmitForm}
    >
      {header}
      {React.Children.map(children, (child, index) => (
        <div className={styles.inputGroups}>
          {React.cloneElement(child, {
            'data-invalid': !!errorList[index],
            validate,
            position: index,
            setErrorList: setErrorList
          })}
          {errorList[index] && (
            <span className={clsx(styles.errorMessage)}>
              <MdOutlineReportProblem fontSize='small' sx={{ marginRight: '0.25rem' }} className={styles.errorIcon} />
              {errorList[index]}
            </span>
          )}
        </div>
      ))}
      {footer}
    </form>
  )
}

export default FormClient
