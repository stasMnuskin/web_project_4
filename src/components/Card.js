export class Card {
  constructor(name, link, selector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  };

  _getTemplate() {
    const cardTemplate = document.querySelector(this._selector).content.querySelector('.elements__card').cloneNode(true);
    return cardTemplate;
  };

  getCardElement = () => {
    //get the template
    this._card = this._getTemplate();
    //setting the templates properties
    this._cardImage = this._card.querySelector('.elements__card-image');
    this._addEventListeners();

    this._card.querySelector('.elements__card-title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    return this._card;
  };
  
  _handleLikeButton = evt => evt.target.classList.toggle('elements__card-button_active');

  _handleDeleteButton = () => this._card.remove();

  _addEventListeners() {
    //deleting the card
    const deleteButton = this._card.querySelector('.elements__card-delete');
    deleteButton.addEventListener('click', this._handleDeleteButton);
    //liking the card
    const likeButton = this._card.querySelector('.elements__card-button');
    likeButton.addEventListener('click', this._handleLikeButton);
    //opening the image modal
    this._cardImage.addEventListener('click', (evt) => {
      this._handleCardClick(evt)
    });
  };
};