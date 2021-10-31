import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup {
  // constructor() {
  //   super()
  // }
  setAction(action) {
    this._submitHandler = action;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitHandler();
      this.close();
    });
  }
}
