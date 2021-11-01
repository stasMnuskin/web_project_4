import { PopupWithForm } from "./PopupWithForm.js";

export class PopupWithSubmit extends PopupWithForm {
  setAction(action) {
    this._submitHandler = action;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitHandler();
    });
  }
}
