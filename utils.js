//image modal
export const imageModal = document.querySelector('.modal_type_image');
//function for opening a modal
export function openPopup(popup) {
  popup.classList.add('modal_open');
  document.addEventListener('mousedown', closeWithClick);
  document.addEventListener('keydown', closeWithEsc);
};

//function for closing a modal
export function closePopup(popup) {
  popup.classList.remove('modal_open');
  document.removeEventListener('mousedown', closeWithClick);
  document.removeEventListener('keydown', closeWithEsc);
};

//function for closing a modal with clicking outside of it
export function closeWithClick (evt) {
  if (evt.target.classList.contains('modal_open')) {
    const modal = document.querySelector('.modal_open');
    closePopup(modal);
  };
};

//function for closing a modal with "Esc" key
export function closeWithEsc (evt) {
  if (evt.key === 'Escape') {
    const modal = document.querySelector('.modal_open');
    closePopup(modal);
  };
};