import {FormValidator} from './FormValidator.js';
import {imageModal, openPopup, closePopup} from './utils.js';
import {Card} from './Card.js';

const settings = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  inactiveButtonClass: "modal__form-button_disabled",
  inputErrorClass: "modal__form-input_theme_error",
  errorClass: "modal__error_visible"
};

//modals
const editModal = document.querySelector('.modal_type_edit');
const addModal = document.querySelector('.modal_type_add');
//forms
const editForm = editModal.querySelector('.modal__form');
const addForm = addModal.querySelector('.modal__form');
//opening
const openingEditModal = document.querySelector('.profile__edit-button');
const openingAddModal = document.querySelector('.profile__add-button');
//open the edit modal
function openEditModal(evt) {
  evt.preventDefault();
  editForm.reset();
  editFormValidator.resetValidation();
  const userName = profileName.textContent;
  const userJob = profileJob.textContent;
  openPopup(editModal);
  nameInput.value = userName; 
  jobInput.value = userJob;
};
openingEditModal.addEventListener('click', openEditModal);
//open the add card modal
function openAddModal(evt) {
  evt.preventDefault();
  addForm.reset();
  addCardFormValidator.resetValidation();
  addCardFormValidator.resetButton();
  openPopup(addModal);
};
openingAddModal.addEventListener('click', openAddModal);

//closing
const closingEditModalButton = editModal.querySelector('.modal__close-button');
const closingAddModalButton = addModal.querySelector('.modal__close-button');
const closingImageModalButton = imageModal.querySelector('.modal__close-button');
//close the edit modal
function closeEditModal() {
  closePopup(editModal);
};
closingEditModalButton.addEventListener('click', closeEditModal);
//close the add card modal
function closeAddModal() {
  closePopup(addModal);
};
closingAddModalButton.addEventListener('click', closeAddModal);
//closing the image modal
function closeImageModal() {
  closePopup(imageModal);
};
closingImageModalButton.addEventListener('click', closeImageModal);

//profile name and profile job
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
//name and job inputs
const nameInput = editModal.querySelector
('.modal__form-input_mod_name');
const jobInput = editModal.querySelector('.modal__form-input_mod_job');
//edit form-implementing the name and job from inputs and close
function editProfile(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  closePopup(editModal);
};
editForm.addEventListener('submit', editProfile); 

//card title and card URL inputs
const titleInput = addModal.querySelector('.modal__form-input_mod_title');
const imageInput = addModal.querySelector('.modal__form-input_mod_image');
 
const cardsList = document.querySelector('.elements__list');
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

//appending 6 initial cards
initialCards.forEach(function(element){
  cardsList.append(makeCard(element.name, element.link));
});

//function that is making new cards
function makeCard(imageName, imageLink) {
  const listItem = new Card(imageName, imageLink);
  const card = listItem.getCardElement();
  closePopup(addModal);
  return card;  
};

//function that adds card to the beginning
function prependNewCard(evt) {
  evt.preventDefault();
  cardsList.prepend(makeCard(titleInput.value, imageInput.value));
};
addForm.addEventListener('submit', prependNewCard);

//validation of the "edit form"
const editFormValidator = new FormValidator(settings, editForm);
editFormValidator.enableValidation();
//validation of the "add form"
const addCardFormValidator = new FormValidator(settings, addForm);
addCardFormValidator.enableValidation();