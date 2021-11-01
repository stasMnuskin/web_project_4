//open modal buttons
export const openEditButton = document.querySelector(".profile__edit-button");
export const openAddButton = document.querySelector(".profile__add-button");
export const openAvatarButton = document.querySelector(".profile__image-button");

//initial settings
export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  inactiveButtonClass: "modal__form-button_disabled",
  inputErrorClass: "modal__form-input_theme_error",
  errorClass: "modal__error_visible",
};

//forms
export const editForm = document.forms.edit;
export const addForm = document.forms.add;
export const avatarForm = document.forms.avatar;

//name and job inputs
export const nameInput = editForm.elements.input_name;
export const jobInput = editForm.elements.input_job;
