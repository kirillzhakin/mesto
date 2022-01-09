const buttonAboutProject = document.querySelector('.profile__button-pen');
const buttonClose = document.querySelector('.popup__close_btn');
const overlay = document.querySelector('.popup');
const overlayActiveClass = 'popup_opened';

buttonAboutProject.addEventListener('click', function() {
  event.preventDefault();
  openPopup();
});

function openPopup() {
  overlay.classList.add(overlayActiveClass);
  document.body.style.overflow = 'hidden'
}

function closePopup() {
  overlay.classList.remove(overlayActiveClass);
  document.body.style.overflow = '';
}

buttonClose.addEventListener('click', function() {
  closePopup();
})

document.addEventListener('keydown', function(event) {
    if (event.code ==='Escape') {
      closePopup(); 
    }
})

let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__field_type_name');
let jobInput = formElement.querySelector('.popup__field_type_about');

function formSubmitHandler (evt) {
    evt.preventDefault();     

    let profileName = document.querySelector ('.profile__name');
    let profileAbout = document.querySelector ('.profile__about');
    
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler); 