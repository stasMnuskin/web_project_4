export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  };
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  };
  open() {
    this._popupElement.classList.add('modal_open');
    document.addEventListener('keyup', this._handleEscClose);
  };
  close = () => {
    this._popupElement.classList.remove('modal_open');
  };
  setEventListeners() {
    this._popupElement.querySelector(".modal__close-button").addEventListener
    ('click', this.close);
    this._popupElement.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('modal')) {
        this.close();
      };
    });
  };
};