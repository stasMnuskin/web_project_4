function showError(input, settings) {
  const {inputErrorClass} = settings;
  //finding the span and set the default browser message to it
  const error = input.validationMessage;
  const errorElement = document.querySelector(`#${input.id}-error`);
  errorElement.textContent = error;
  //turning the text color to red
  input.classList.add(inputErrorClass);
};

function hideError(input, settings) {
  const {inputErrorClass} = settings;
  //finding the span and make it empty
  const errorElement = document.querySelector(`#${input.id}-error`);
  errorElement.textContent = '';
  //turning the text color back to black
  input.classList.remove(inputErrorClass);
};

//checking if the input is valid
function checkValidity(input, settings) {
  if (input.validity.valid) {
    hideError(input, settings);
  } else {
    showError(input, settings);
  };
};

function toggleButtonState(inputs, button, settings) {
  const {inactiveButtonClass} = settings;
  const isFormValid = inputs.every(input => input.validity.valid);
  if (isFormValid) {
    //if the form is valid enable button
    button.disabled = false;
    button.classList.remove(inactiveButtonClass);  
  } else {
    //disable button
    button.disabled = true;
    button.classList.add(inactiveButtonClass);
  };
};

function enableValidation(settings) {
  const {formSelector, inputSelector, submitButtonSelector, ...rest} = settings;
  //finding all the forms and put them into array
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach(form => {
    //array of inputs from the forms
    const formInputs = Array.from(form.querySelectorAll(inputSelector));
    const button = form.querySelector(submitButtonSelector);
    formInputs.forEach(input => {
      input.addEventListener('input', function() {
        checkValidity(input, settings);
        toggleButtonState(formInputs, button, rest);
      });
    });
  });
};

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  inactiveButtonClass: "modal__form-button_disabled",
  inputErrorClass: "modal__form-input_theme_error",
  errorClass: "modal__error_visible"
}; 

enableValidation(config); 