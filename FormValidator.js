class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  };
  
  _showError(input) {
    const error = input.validationMessage;
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    errorElement.textContent = error;
  };
  
  _hideError(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    errorElement.textContent = '';
  };
  
  
  _checkValidity(input) {
    if (input.validity.valid) {
      this._hideError(input);
    } else {
      this._showError(input);
    }
  };
  
  _setEventListeners() {
    const {inputSelector} = this._settings;
    this.formInputs = Array.from(this._formElement.querySelectorAll(inputSelector));
    this.formInputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkValidity(input);
        this._toggleButtonState(this.formInputs);
      });
    });
  };

  _toggleButtonState() {
    const {submitButtonSelector, inactiveButtonClass} = this._settings;
    const button = this._formElement.querySelector(submitButtonSelector);
    const isFormValid = this.formInputs.every(input => input.validity.valid);
    button.disabled = (!isFormValid);
    if (isFormValid) {
      //if the form is valid enable button
      button.classList.remove(inactiveButtonClass);
    } else {
      //disable button
      button.classList.add(inactiveButtonClass);
    };
  };

  resetValidation() {
    this.formInputs.forEach(input => {
      this._hideError(input);
    });
  };

  resetButton() {
    const saveButton = document.querySelector('.modal__form-button');
    saveButton.disabled = true;
    saveButton.classList.add('modal__form-button_disabled');
  };

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(this.formElement, this.settings);
  };
};

export {FormValidator}; 