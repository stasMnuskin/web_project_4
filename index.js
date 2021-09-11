//modals
const editModal = document.querySelector('.modal_type_edit');
const addModal = document.querySelector('.modal_type_add');
const imageModal = document.querySelector('.modal_type_image');

//opening
const openingEditModal = document.querySelector('.profile__edit-button');
const openingAddModal = document.querySelector('.profile__add-button');

//figure (image and caption)
const imageFromModal = imageModal.querySelector('.modal__image');
const captionFromModal = imageModal.querySelector('.modal__caption');

//function for toggling open or closed modal
function openPopup(popup) {
  popup.classList.add('modal_open');
}

//open the image modal
function openImageModal(evt) {
  openPopup(imageModal);
  const target = evt.target;
  const link = target.src;
  const name = target.alt;
  imageFromModal.setAttribute("src", link);
  imageFromModal.setAttribute("alt", name);
  captionFromModal.textContent = name;
};
//open the edit modal
function openEditModal() {
  const userName = profileName.textContent;
  const userJob = profileJob.textContent;
  openPopup(editModal);
  nameInput.value = userName; 
  jobInput.value = userJob;
};
openingEditModal.addEventListener('click', openEditModal);
//open the add card modal
function openAddModal() {
  openPopup(addModal);
  addForm.reset();
};
openingAddModal.addEventListener('click', openAddModal);

//closing
const closingEditModal = editModal.querySelector('.modal__close-button');
const closingAddModal = addModal.querySelector('.modal__close-button');
const closingImageModal = imageModal.querySelector('.modal__close-button');

function closePopup(popup) {
  popup.classList.remove('modal_open');
};

//close the edit modal
function closeEditModal() {
  closePopup(editModal);
};
closingEditModal.addEventListener('click', closeEditModal);
//close the add card modal
function closeAddModal() {
  closePopup(addModal);
};
closingAddModal.addEventListener('click', closeAddModal);
//closing the image modal
function closeImageModal() {
  closePopup(imageModal);
};
closingImageModal.addEventListener('click', closeImageModal);

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
  closePopup(editModal);
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
function generateCard(name, link) {
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
  cardImage.addEventListener('click', openImageModal);
  return listItem;
};

//appending 6 initial cards
initialCards.forEach(function(card) {
  cardsList.append(generateCard(card.name, card.link));    
});

//function that is making new cards
function makeCard(evt) {
  evt.preventDefault();
  const imageName = titleInput.value;
  const imageLink = imageInput.value;
  cardsList.prepend(generateCard(imageName, imageLink));
  closePopup(addModal)  
};
const addForm = addModal.querySelector('.modal__form');
addForm.addEventListener('submit', makeCard);