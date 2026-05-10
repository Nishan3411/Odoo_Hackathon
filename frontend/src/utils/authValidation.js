const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateLogin(values) {
  const errors = {}

  if (!values.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!emailPattern.test(values.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!values.password) {
    errors.password = 'Password is required.'
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.'
  }

  return errors
}

export function validateSignup(values) {
  const errors = validateLogin(values)

  if (!values.name.trim()) {
    errors.name = 'Full name is required.'
  } else if (values.name.trim().length < 3) {
    errors.name = 'Use at least 3 characters.'
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm your password.'
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords do not match.'
  }

  if (!values.terms) {
    errors.terms = 'Accept the travel workspace terms to continue.'
  }

  return errors
}

export const hasErrors = (errors) => Object.keys(errors).length > 0
