const buttonAboutProject = document.querySelector('.profile__button-pen');
const buttonClose = document.querySelector('.popup__close-btn');
const overlay = document.querySelector('.popup');
const overlayActiveClass = 'popup_opened';

let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__field_type_name');
let jobInput = formElement.querySelector('.popup__field_type_about');
let profileName = document.querySelector ('.profile__name');
let profileAbout = document.querySelector ('.profile__about');

function openPopup() {
  overlay.classList.add(overlayActiveClass);
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
}

buttonAboutProject.addEventListener('click', openPopup);

function closePopup() {
  overlay.classList.remove(overlayActiveClass);
}

buttonClose.addEventListener('click', closePopup);

document.addEventListener('keydown', function(event) {
    if (event.code ==='Escape') {
      closePopup();
    }
})

function formSubmitHandler (evt) {
    evt.preventDefault();    
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);