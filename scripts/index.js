// Кнопки открытия
const buttonAboutProject = document.querySelector(".profile__button-pen");
const buttonAddProject = document.querySelector(".profile__button-plus");

//Попап
const popupProfile = document.querySelector(".popup_type_profile");
const popupAdd = document.querySelector(".popup_type_card-add");
const popupImage = document.querySelector(".popup_type_picture");

//Кнопки закрытия
const profileCloseButton = document.querySelector(
  ".popup__close-btn_type_profile"
);
const addCloseButton = document.querySelector(".popup__close-btn_type_add");
const imageCloseButton = document.querySelector(
  ".popup__close-btn_type_picture"
);

// Формы
const formProfile = document.querySelector(".popup__form_type_profile");
const formAddElement = document.querySelector(".popup__form_type_add");
const popupList = document.querySelectorAll(".popup");

// Инпуты
const nameAddInput = formAddElement.querySelector(".popup__field_type_title");
const linkAddInput = formAddElement.querySelector(".popup__field_type_link");
const nameInput = formProfile.querySelector(".popup__field_type_name");
const jobInput = formProfile.querySelector(".popup__field_type_about");

//Селекторы профайла
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

// Активация
const OVERLAY_ACTIVE_CLASS = "popup_opened";

//Функции открытия закрытия
function openPopup(popup) {
  popup.classList.add(OVERLAY_ACTIVE_CLASS);
  document.addEventListener("keydown", closePopupEscape);
}

function closePopup(popup) {
  popup.classList.remove(OVERLAY_ACTIVE_CLASS);
  document.removeEventListener("keydown", closePopupEscape);
}

//Функция закрытия Оверлэй
popupList.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
  });
});

// Функция закрытия Esc
function closePopupEscape(event) {
  if (event.key === "Escape") {
    const activePopup = document.querySelector(`.${OVERLAY_ACTIVE_CLASS}`);
    closePopup(activePopup);
  }
}

// Попап профайл
function openPopupProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  toggleButtonState(formProfile, formsValidation);
  openPopup(popupProfile);
}

function closePopupProfile() {
  closePopup(popupProfile);
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopupProfile();
}

buttonAboutProject.addEventListener("click", openPopupProfile);
profileCloseButton.addEventListener("click", closePopupProfile);
formProfile.addEventListener("submit", handleProfileSubmit);

//Попап Адд
function openPopupAdd() {
  toggleButtonState(formAddElement, formsValidation);
  openPopup(popupAdd);
}

function closePopupAdd() {
  closePopup(popupAdd);
}

const handleAddCardSubmit = (e) => {
  e.preventDefault();
  const element = {
    name: nameAddInput.value,
    link: linkAddInput.value,
  };
  renderElement(element, elementsWrap);
  e.target.reset();
  closePopupAdd();
};

buttonAddProject.addEventListener("click", openPopupAdd);
addCloseButton.addEventListener("click", closePopupAdd);
formAddElement.addEventListener("submit", handleAddCardSubmit);

// Попап картинка
// Селекторы попап с картинкой
const popupImagePhoto = document.querySelector(".popup__picture");
const popupImageTitle = document.querySelector(".popup__title-picture");

function openPopupImage() {
  openPopup(popupImage);
}

function closePopupImage() {
  closePopup(popupImage);
}

imageCloseButton.addEventListener("click", closePopupImage);

// Карточки initialCards

const elementsWrap = document.querySelector(".elements");
const elementTemplate = document
  .querySelector("#element-template")
  .content.querySelector(".element");

const createCard = (item) => {
  const template = elementTemplate.cloneNode(true);
  const titleTemplate = template.querySelector(".element__title");
  const linkTemplate = template.querySelector(".element__photo");
  const likeButton = template.querySelector(".element__heart");
  const trashButton = template.querySelector(".element__trash");

  titleTemplate.textContent = item.name;
  linkTemplate.src = item.link;
  linkTemplate.alt = item.name;

  function openPopupPhoto() {
    openPopup(popupImage);
    popupImageTitle.textContent = item.name;
    popupImagePhoto.alt = item.name;
    popupImagePhoto.src = item.link;
  }

  likeButton.addEventListener("click", handleLikeButton);
  trashButton.addEventListener("click", handleTrashButton);
  linkTemplate.addEventListener("click", openPopupPhoto);
  return template;
};

const renderElement = (item, elementsWrap) => {
  const template = createCard(item);
  elementsWrap.prepend(template);
};

const handleLikeButton = (e) => {
  e.target.classList.toggle("element__heart_active");
};

const handleTrashButton = (e) => {
  e.target.closest(".element").remove();
};

initialCards.forEach((item) => {
  renderElement(item, elementsWrap);
});
