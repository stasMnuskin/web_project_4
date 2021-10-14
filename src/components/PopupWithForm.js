import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popupElement.querySelector(".modal__form");
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
      this._submitHandler(this.getInputValues());
      this.close();
    });
  }
  close() {
    super.close();
    this._form.reset();
  }
}
