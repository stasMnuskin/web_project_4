import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popupElement.querySelector(".modal__form");
  }

  changeButtonText(isUploading) {
    const saveButton = this._form.querySelector(".modal__form-button");
    if (isUploading) {
      saveButton.textContent = "Saving...";
    } else {
      saveButton.textContent = "Save";
    }
  }
  getInputValues() {
    const inputs = Array.from(
      this._form.querySelectorAll(".modal__form-input")
    );
    const inputValues = {};

    inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", () => {
      this._submitHandler();
      // this.close();
    });
  }
  close() {
    super.close();
    this._form.reset();
  }
}
