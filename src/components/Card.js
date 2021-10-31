export class Card {
  constructor({
    data,
    handleCardClick,
    handleDeleteButton,
    handleLike,
    selector,
    userId,
  }) {
    this._name = data.name;
    this._link = data.link;
    this._like = data.likes;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButton = handleDeleteButton;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._handleLike = handleLike;
    this._likes = data.likes;
    this._userId = userId;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._selector)
      .content.querySelector(".elements__card")
      .cloneNode(true);
    return cardTemplate;
  }

  getCardElement() {
    //get the template
    this._card = this._getTemplate();

    //get the like and delete buttons
    this._deleteButton = this._card.querySelector(".elements__card-delete");
    this._likeButton = this._card.querySelector(".elements__card-button");
    //setting the templates properties
    this._cardImage = this._card.querySelector(".elements__card-image");
    this._addEventListeners();
    this._card.querySelector(".elements__card-title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    // check if the card is owned
    if (this._ownerId !== this._userId) {
      this._deleteButton.style.display = "none";
    }

    //setting the number of likes
    this._card.querySelector(
      ".elements__card-likes"
    ).textContent = this._likes.length;
    
    //if true: setting the
    if (this.isLiked()) {
      this.likeCard(this._likes);
    }
    return this._card;
  }

  isLiked() {
    return this._likes.some((person) => {
      return person._id === this._userId;
    });
  }

  likeCard(newLikes) {
    // console.log(this._likeCounter);
    this._likes = newLikes;
    this._card.querySelector(".elements__card-likes").textContent =
      this._likes.length;
    this._likeButton.classList.toggle("elements__card-button_active");
  }

  removeCard() {
    this._card.remove();
    this._card = null;
  }

  _addEventListeners() {
    //deleting the card
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteButton(this._id)
    );
    //liking the card
    this._likeButton.addEventListener("click", () =>
      this._handleLike(this._id)
    );
    //opening the image modal
    this._cardImage.addEventListener("click", (evt) => {
      () => this._handleCardClick(evt);
    });
  }
}
