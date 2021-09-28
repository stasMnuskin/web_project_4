import {imageModal, openPopup} from './utils.js';

export class Card {
  constructor(name, link) {
    this._name = name;
    this._link = link;
  };

  _getTemplate() {
    const cardTemplate = document.querySelector('.card-template').content.querySelector('.elements__card').cloneNode(true);
    return cardTemplate;
  };

  _handleLikeButton = evt => evt.target.classList.toggle('elements__card-button_active');

  _handleDeleteButton = () => this._card.remove();
  
  _openImageModal = () => {
    //figure (image and caption)
    this._imageFromModal = imageModal.querySelector('.modal__image');
    this._captionFromModal = imageModal.querySelector('.modal__caption');
    //setting the properties of the figure
    this._imageFromModal.src = this._link;
    this._imageFromModal.alt = this._name;
    this._captionFromModal.textContent = this._name;
    openPopup(imageModal);
  };

  _addEventListeners() {
    //deleting the card
    const deleteButton = this._card.querySelector('.elements__card-delete');
    deleteButton.addEventListener('click', this._handleDeleteButton);
    //liking the card
    const likeButton = this._card.querySelector('.elements__card-button');
    likeButton.addEventListener('click', this._handleLikeButton);
    //opening the image modal
    this._card.querySelector('.elements__card-image').addEventListener('click', this._openImageModal);
  };

  getCardElement = () => {
    //get the template
    this._card = this._getTemplate();
    //setting the templates properties
    this._card.querySelector('.elements__card-title').textContent = this._name;
    this._card.querySelector('.elements__card-image').src = this._link;
    this._card.querySelector('.elements__card-image').alt = this._name;

    this._addEventListeners();
    return this._card;
  };
};