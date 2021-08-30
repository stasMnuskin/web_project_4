let openModal = document.querySelector('.profile__edit-button');
let modal = document.querySelector('.modal');
let closeModal = document.querySelector('.modal__close-button');
let form = document.querySelector('.modal__form');
let nameInput = document.querySelector
('.modal__form-input_mod_name');
let jobInput = document.querySelector('.modal__form-input_mod_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

function closingModal() {
  modal.classList.remove('modal_open');
};

function openingModal() {
  let userName = profileName.textContent;
  let userJob = profileJob.textContent;

  modal.classList.add('modal_open');
  nameInput.value = userName; 
  jobInput.value = userJob;
};

form.addEventListener('submit', function(e){
  e.preventDefault();
  let nameValue = nameInput.value;
  let jobValue = jobInput.value;

  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  closingModal();
});
openModal.addEventListener('click', openingModal);
closeModal.addEventListener('click', closingModal)