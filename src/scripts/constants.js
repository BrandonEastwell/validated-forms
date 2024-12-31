const ERROR_MESSAGES = {
  REQUIRED_FIELD: "This is a required field",
  PASSWORD_LENGTH: "Password must be at least 7 characters long",
  PASSWORD_MISMATCH: "Passwords do not match",
  POSTCODE_PATTERN: "Please enter a valid postal code",
  EMAIL_PATTERN: "Please enter a valid email address",
  INVALID_INPUT: "Please enter a valid value"
}

const FORM_INPUT_TYPES = {
  PASSWORD: "password",
  PASSWORD_CONFIRMATION: "password_confirmation",
  POSTCODE: "zipcode",
  EMAIL: "email",
  COUNTRY: "country",
}

export {ERROR_MESSAGES, FORM_INPUT_TYPES}