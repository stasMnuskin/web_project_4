import "./index.css";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { PopupWithSubmit } from "../components/PopupWithSubmit.js";
import {
  openEditButton,
  openAddButton,
  settings,
  editForm,
  nameInput,
  jobInput,
  addForm,
  avatarForm,
  openAvatarButton,
} from "../components/constants.js";
import { api } from "../components/Api";

let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()]).then(
  ([cardData, userData]) => {
    userId = userData._id;
    section.renderer(cardData);
    userInfo.setUserInfo({
      userName: userData.name,
      userJob: userData.about,
    });
    userInfo.changeAvatar(userData.avatar);
  }
);

//image and delete modal
const imageModal = new PopupWithImage(".modal_type_image");
const confirmModal = new PopupWithSubmit(".modal_type_delete-card");
//deleting modal
confirmModal.setEventListeners();

//function that is making a card
function generateNewCard(info) {
  const card = new Card({
    data: info,
    // id: info._id,
    handleCardClick: (evt) => {
      evt.preventDefault();
      const target = evt.target;
      const link = target.src;
      const text = target.alt;
      imageModal.open(link, text);
      imageModal.setEventListeners();
    },
    handleDeleteButton: (userId) => {
      confirmModal.open();
      confirmModal.setAction(() => {
        api.deleteCard(userId).then((result) => {
          card.removeCard();
          confirmModal.close();
        });
      });
    },
    handleLike: (userId) => {
      const isAlreadyLiked = card.isLiked();
      if (isAlreadyLiked) {
        api.deleteLike(userId).then((result) => {
          card.likeCard(result.likes);
        });
      } else {
        api.likeCard(userId).then((result) => {
          card.likeCard(result.likes);
        });
      }
    },
    selector: ".card-template",
    userId: userId,
  });

  const cardElement = card.getCardElement();

  return cardElement;
}

//pre-pending a card to the crd list
const section = new Section((card) => {
  section.addItem(generateNewCard(card));
}, ".elements__list");

//setting up profile selectors
const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileJobSelector: ".profile__job",
  avatarSelector: ".profile__image",
});

//avatar modal
const avatarFormModal = new PopupWithForm(".modal_type_avatar", () => {
  avatarFormModal.changeButtonText(true);
  const avatarInput = avatarFormModal.getInputValues();
  api.changeAvatar(avatarInput).then((result) => {
    userInfo.changeAvatar(result.avatar);
  });
});
avatarFormModal.setEventListeners();

//setting up the edit modal
const editFormModal = new PopupWithForm(".modal_type_edit", () => {
  editFormModal.changeButtonText(true);
  const editInputs = editFormModal.getInputValues();
  api.updateProfile(editInputs).then((result) => {
    userInfo.setUserInfo({ userName: result.name, userJob: result.about });
  });
});
editFormModal.setEventListeners();

//adding a card with users inputs and add it to the server
const addModal = new PopupWithForm(".modal_type_add", () => {
  addModal.changeButtonText(true);
  const addModalInputs = addModal.getInputValues();
  api.createCard(addModalInputs).then((result) => {
    section.addItem(generateNewCard(result));
  });
});
addModal.setEventListeners();

//function that is opening and reset the validation of the avatar form
function avatarFormListener() {
  avatarFormModal.changeButtonText(false);
  avatarFormValidator.resetValidation();
  avatarFormModal.open();
}
openAvatarButton.addEventListener("click", () => avatarFormListener());

//function that is opening  the edit form and changing the values of its inputs
function editFormListener() {
  editFormModal.changeButtonText(false);
  editFormValidator.resetValidation();
  editFormModal.open();
  const editFormInputs = userInfo.getUserInfo();
  nameInput.value = editFormInputs.name;
  jobInput.value = editFormInputs.about;
}
openEditButton.addEventListener("click", () => editFormListener());

//function that is opening and reset the validation of the add form
function addFormListener() {
  addCardFormValidator.resetValidation();
  addModal.open();
  addModal.changeButtonText(false);
}
openAddButton.addEventListener("click", () => addFormListener());

// validation of the "add form"
const addCardFormValidator = new FormValidator(settings, addForm);
addCardFormValidator.enableValidation();

// validation of the "avatar form"
const avatarFormValidator = new FormValidator(settings, avatarForm);
avatarFormValidator.enableValidation();

//validation of the edit form
const editFormValidator = new FormValidator(settings, editForm);
editFormValidator.enableValidation();
