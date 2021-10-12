import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  open(link, text) {
    const imageFromModal = this._popupElement.querySelector('.modal__image');
    const captionFromModal = this._popupElement.querySelector('.modal__caption');

    imageFromModal.src = link;
    imageFromModal.alt = text;
    captionFromModal.textContent = text;

    super.open();
  };
};

// const popupImage = new PopupWithImage('.modal_type_image');
// popupImage.open();