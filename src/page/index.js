import "./index.css";
import { FormValidator } from '../components./FormValidator.js';
import { Card } from '../components./Card.js';
import { PopupWithForm } from "../components./PopupWithForm.js";
import { PopupWithImage } from '../components./PopupWithImage.js';
import { UserInfo } from '../components./UserInfo.js';
import { Section } from '../components./Section.js';
import { 
  openEditButton,
  openAddButton,
  settings,
  initialCards,
  editForm,
  nameInput,
  jobInput,
  addForm
} from './utils.js';

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

//setting up the edit modal
const editFormModal = new PopupWithForm('.modal_type_edit', (data) => {
  userInfo.setUserInfo(editFormModal.getInputValues());
});
editFormModal.setEventListeners();


const editFormValidator = new FormValidator(settings, editForm);
editFormValidator.enableValidation();

openEditButton.addEventListener('click', () => {
  editFormValidator.resetValidation();
  editFormModal.open();
  const formInputs = userInfo.getUserInfo();
  nameInput.value = formInputs.userName;
  jobInput.value = formInputs.userJob;
});

const addModal = new PopupWithForm('.modal_type_add', () => {
  const inputFields = addModal.getInputValues();
  section.addItem(generateNewCard(inputFields));
});
addModal.setEventListeners();
 

openAddButton.addEventListener('click', () =>{
  addCardFormValidator.resetValidation();
  addModal.open();
});

// validation of the "add form"
const addCardFormValidator = new FormValidator(settings, addForm);
addCardFormValidator.enableValidation();