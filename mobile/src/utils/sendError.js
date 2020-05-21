import * as Yup from 'yup'

const sendError = (err, formRef) => {
  if (err instanceof Yup.ValidationError) {
    const errorMessages = {}
    err.inner.forEach((error) => {
      errorMessages[error.path] = error.message
    })

    formRef.current.setErrors(errorMessages)
  }
}

export default sendError
