export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._form = this._popupElement.querySelector(".modal__form");
  }
  //close with "esc"
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._popupElement.classList.add("modal_open");
    document.addEventListener("keyup", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_open");
    document.removeEventListener("keyup", this._handleEscClose);
  }
  changeButtonText(isUploading) {
    const saveButton = this._form.querySelector(".modal__form-button");
    if (isUploading) {
      saveButton.textContent = "Saving...";
    } else {
      saveButton.textContent = "Save";
    }
  }
  setEventListeners() {
    this._popupElement
      .querySelector(".modal__close-button")
      .addEventListener("click", () => {
        this.close();
      });
    this._popupElement.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("modal")) {
        this.close();
      }
    });
  }
}
