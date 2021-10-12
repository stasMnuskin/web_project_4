import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from './PopupWithImage.js';
import { UserInfo } from './UserInfo.js';
import { Section } from './Section.js';

//open buttons
const openEditButton = document.querySelector('.profile__edit-button');
const openAddButton = document.querySelector('.profile__add-button');
//initial settings
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  inactiveButtonClass: "modal__form-button_disabled",
  inputErrorClass: "modal__form-input_theme_error",
  errorClass: "modal__error_visible"
};

//initial array of cards
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

//image modal
const imageModal = new PopupWithImage('.modal_type_image');
//function that is making a card   
function generateNewCard(data) {
  const card = new Card(
    data.name,
    data.link,
    '.card-template',
    (evt) => {
      evt.preventDefault();
      const target = evt.target;
      const link = target.src;
      const text = target.alt;
      imageModal.open(link, text);
      imageModal.setEventListeners();
    });
  
  const cardElement = card.getCardElement();

  return cardElement;
};

const section = new Section({
  data: initialCards,
  renderer: (item) => {
    section.addItem(generateNewCard(item));
  },
},
'.elements__list');
section.renderer();

//setting up profile selectors 
const userInfo = new UserInfo({
  profileName: '.profile__name',
  profileJob: '.profile__job'
});

const editFormModal = new PopupWithForm('.modal_type_edit', (data) => {
  userInfo.setUserInfo(data);
});
editFormModal.setEventListeners();

const editForm = document.forms.edit;
const nameInput = editForm.elements.input_name;
const jobInput = editForm.elements.input_job;

const editFormValidator = new FormValidator(settings, editForm);
editFormValidator.enableValidation();

openEditButton.addEventListener('click', () => {
  editFormValidator.resetValidation();
  editFormModal.open();
  const formInputs = userInfo.getUserInfo();
  nameInput.value = formInputs.userName;
  jobInput.value = formInputs.userJob;
  // console.log(jobInput.value,"jobInput.value");
  // console.log(nameInput.value,"nameInput.value");

});

const addForm = document.forms.add;  
const addModal = new PopupWithForm('.modal_type_add', (data) => {
  section.addItem(generateNewCard(data));
});
addModal.setEventListeners();
 
openAddButton.addEventListener('click', () =>{
  addCardFormValidator.resetValidation();
  addModal.open();
});

// validation of the "add form"
const addCardFormValidator = new FormValidator(settings, addForm);
addCardFormValidator.enableValidation();