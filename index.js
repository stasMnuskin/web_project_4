//modals
const editModal = document.querySelector('.modal_type_edit');
const addModal = document.querySelector('.modal_type_add');
const imageModal = document.querySelector('.modal_type_image');

//opening
const openEditModal = document.querySelector('.profile__edit-button');
const openAddModal = document.querySelector('.profile__add-button');

//open the image modal
function openingImageModal(evt) {
  const imageFromModal = imageModal.querySelector('.modal__image');
  const captionFromModal = imageModal.querySelector('.modal__caption');
  imageModal.classList.add('modal_open');
  const target = evt.target;
  const link = target.src;
  const name = target.alt;
  imageFromModal.setAttribute("src", link);
  imageFromModal.setAttribute("alt", name);
  captionFromModal.textContent = name;
};
//open the edit modal
function openingEditModal() {
  const userName = profileName.textContent;
  const userJob = profileJob.textContent;
  editModal.classList.add('modal_open');
  nameInput.value = userName; 
  jobInput.value = userJob;
};
openEditModal.addEventListener('click', openingEditModal);
//open the add card modal
function openingAddModal() {
  addModal.classList.add('modal_open');
  addForm.reset();
};
openAddModal.addEventListener('click', openingAddModal);

//closing
const closeEditModal = editModal.querySelector('.modal__close-button');
const closeAddModal = addModal.querySelector('.modal__close-button');
const closeImageModal = imageModal.querySelector('.modal__close-button');
//close the edit modal
function closingEditModal() {
  editModal.classList.remove('modal_open');
};
//close the add card modal
closeEditModal.addEventListener('click', closingEditModal);
function closingAddModal() {
  addModal.classList.remove('modal_open');
};
closeAddModal.addEventListener('click', closingAddModal);
//closing the image modal
function closingImageModal() {
  imageModal.classList.remove('modal_open');
};
closeImageModal.addEventListener('click', closingImageModal);

//profile name and profile job
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

//name and job inputs
const nameInput = editModal.querySelector
('.modal__form-input_mod_name');
const jobInput = editModal.querySelector('.modal__form-input_mod_job');

//edit form-implementing the name and job from inputs and close
const editForm = editModal.querySelector('.modal__form');
function editProfile(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  closingEditModal();
};
editForm.addEventListener('submit', editProfile); 

//card title and card URL inputs
const titleInput = addModal.querySelector('.modal__form-input_mod_title');
const imageInput = addModal.querySelector('.modal__form-input_mod_image');
// card template and list 
const cardTemplate = document.querySelector('.card-template').content.querySelector('.elements__card');
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

//function that generate cards and their features 
function cardGenerate(name, link) {
  const listItem = cardTemplate.cloneNode(true);
  const cardImage = listItem.querySelector('.elements__card-image');
  listItem.querySelector('.elements__card-title').textContent = name;
  cardImage.setAttribute("src", link);
  cardImage.setAttribute("alt", name);
  const deleteButton = listItem.querySelector('.elements__card-delete');
  const likeButton = listItem.querySelector('.elements__card-button');
  //deleting the card
  deleteButton.addEventListener('click', function() {
    deleteButton.parentElement.remove();
  });
  //liking the card
  likeButton.addEventListener('click', function() {
    likeButton.classList.toggle('elements__card-button_active')
  });
  //image popup
  cardImage.addEventListener('click', openingImageModal);
  return listItem;
};

//appending 6 initial cards
initialCards.forEach(function(card) {
  cardsList.append(cardGenerate(card.name, card.link));    
});

//function that is making new cards
function makingCard(evt) {
  evt.preventDefault();
  const imageName = titleInput.value;
  const imageLink = imageInput.value;
  cardsList.prepend(cardGenerate(imageName, imageLink));
  closingAddModal();  
};
const addForm = addModal.querySelector('.modal__form');
addForm.addEventListener('submit', makingCard);