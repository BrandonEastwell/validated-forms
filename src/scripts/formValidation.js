import { ERROR_MESSAGES, FORM_INPUT_TYPES } from "./constants";

export function formValidation(formRows) {
  const validationMap = {
    [FORM_INPUT_TYPES.EMAIL]: validateEmail,
    [FORM_INPUT_TYPES.PASSWORD]: validatePassword,
    [FORM_INPUT_TYPES.POSTCODE]: validatePostcode,
    [FORM_INPUT_TYPES.PASSWORD_CONFIRMATION]: validatePasswordConfirmation,
  };

  let passwordToCheck = "";

  for (const row of formRows) {
    const input = row.querySelector("input");
    const error = row.querySelector("span");

    if (!input || !error) {
      console.warn(`Form row missing input or error span element`);
      continue;
    }

    if (input.name === FORM_INPUT_TYPES.PASSWORD_CONFIRMATION) {
      passwordToCheck = input.value;
    }

    input.addEventListener("input", (event) => {
      validateInput(input, error, validationMap[input.name], passwordToCheck);
    });

  }
}

function validateInput(input, error, specificValidation, passwordToCheck) {
  if (input.validity.valid) {
    // For password confirmation, we need to check match even if valid
    if (input.name === FORM_INPUT_TYPES.PASSWORD_CONFIRMATION) {
      return specificValidation(input, error, passwordToCheck);
    }

    hideError(error);
    return;
  }

  // General Validation
  if (input.validity.valueMissing) {
    displayError(error, ERROR_MESSAGES.REQUIRED_FIELD);
    return;
  }

  // Check for specific validation
  if (specificValidation) {
    specificValidation(input, error);
    return;
  }

  // Default handling
  displayError(error, ERROR_MESSAGES.INVALID_INPUT);

}

function validateEmail(input, error) {
  if (input.validity.patternMismatch || input.validity.typeMismatch) {
    displayError(error, ERROR_MESSAGES.EMAIL_PATTERN);
  }
}

function validatePassword(input, error) {
  if (input.validity.tooShort) {
    displayError(error, ERROR_MESSAGES.PASSWORD_LENGTH);
  }
}

function validatePostcode(input, error) {
  if (input.validity.patternMismatch) {
    displayError(error, ERROR_MESSAGES.POSTCODE_PATTERN);
  }
}

function validatePasswordConfirmation(input, error, passwordToMatch) {
  if (input.value !== passwordToMatch) {
    displayError(error, ERROR_MESSAGES.PASSWORD_MISMATCH);
  }
}

function displayError(error, message) {
  error.textContent = message;
  error.className = "error active"
}

function hideError(error) {
  error.textContent = ""
  error.className = "error"
}