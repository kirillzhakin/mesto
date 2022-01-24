const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Попап Редактировать профиль

const buttonAboutProject = document.querySelector('.profile__button-pen');
const buttonClose = document.querySelector('.popup__close-btn');
const overlay = document.querySelector('.popup');
const overlayActiveClass = ('popup_opened');

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

// Попап Добавить карточку

const buttonAddProject = document.querySelector('.profile__button-plus');
const buttonAddClose = document.querySelector('.popup-plus__close-btn');
const overlayAdd = document.querySelector('.popup-plus');
const overlayAddActiveClass = ('popup-plus_opened');

let formAddElement = document.querySelector('.popup-plus__form');
let nameAddInput = formAddElement.querySelector('.popup-plus__field_type_title');
let linkAddInput = formAddElement.querySelector('.popup-plus__field_type_link');

function openPopupplus() {
  overlayAdd.classList.add(overlayAddActiveClass);
};

buttonAddProject.addEventListener('click', openPopupplus);

function closePopupplus() {
  overlayAdd.classList.remove(overlayAddActiveClass);
};

buttonAddClose.addEventListener('click', closePopupplus);

document.addEventListener('keydown', function(event) {
    if (event.code ==='Escape') {
      closePopupplus();
    };
});

const hendleElementFormSubmit =(e)=> {
  e.preventDefault();
  const element = {
    name: nameAddInput.value,
    link: linkAddInput.value 
  }
  renderElement(element, elementsWrap);
  closePopupplus();
}

formAddElement.addEventListener ('submit', hendleElementFormSubmit);


// Попап с картинкой

const buttonImgClose = document.querySelector('.popup-image__close-btn');
const overlayImg = document.querySelector('.popup-image');
const overlayImgActiveClass = ('popup-image_opened');
let formImgElement = document.querySelector('.popup-image__form');
let popupImagephoto = document.querySelector('.popup-image__photo');
let popupImagetitle = document.querySelector('.popup-image__title');

// Карточки initialCards

const elementsWrap = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template')
     .content.querySelector('.element');

const getElement =(item) => {
  
  const template = elementTemplate.cloneNode(true);
  const titletemplate = template.querySelector('.element__title');
  const linktemplate = template.querySelector('.element__photo');
  const likeButton = template.querySelector('.element__heart');
  const TrashButton = template.querySelector('.element__trash');
  const elementPhoto = template.querySelector( '.element__photo');

  likeButton.addEventListener('click', handleLikeButton);
  TrashButton.addEventListener('click', handleTrashButton);
  
  titletemplate.textContent = item.name;
  linktemplate.src = item.link;
  
  function openPopupimage() {
    overlayImg.classList.add(overlayImgActiveClass);
    popupImagetitle.textContent = item.name;
    popupImagephoto.alt = item.name;
    popupImagephoto.src = item.link;
  };

  function closePopupimage() {
    overlayImg.classList.remove(overlayImgActiveClass);
  };

  elementPhoto.addEventListener('click', openPopupimage);
  buttonImgClose.addEventListener('click', closePopupimage);
  document.addEventListener('keydown', function(event) {
    if (event.code ==='Escape') {
      closePopupimage();
    };
  });
  return template; 
};

const renderElement =(item, elementsWrap) => {
  const template = getElement(item)
  elementsWrap.prepend(template);
};

const handleLikeButton = (e) => {
  e.target.classList.toggle('element__heart_active');
};

const handleTrashButton = (e) => {
  e.target.closest('.element').remove();
};

initialCards.forEach(item => {
  renderElement(item, elementsWrap);
});