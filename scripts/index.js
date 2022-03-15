import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import {initialCards} from "./initialСards.js";

const formsValidation = {
  formElement: ".popup__form",
  inputElement: ".popup__field",
  buttonElement: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__field_type_error",
  errorShowClass: "error_type_visible",
};

// Формы
const formProfile = document.querySelector(".popup__form_type_profile");
const formAddElement = document.querySelector(".popup__form_type_add");
const popupList = document.querySelectorAll(".popup");

const validAdd = new FormValidator(formsValidation, formAddElement);
const validProfile = new FormValidator(formsValidation, formProfile);

validAdd.enableValidation();
validProfile.enableValidation();

// Активация
const OVERLAY_ACTIVE_CLASS = "popup_opened";

//Функции открытия закрытия
export function openPopup(popup) {
  popup.classList.add(OVERLAY_ACTIVE_CLASS);
  document.addEventListener("keydown", closePopupEscape);
}

function closePopup(popup) {
  popup.classList.remove(OVERLAY_ACTIVE_CLASS);
  document.removeEventListener("keydown", closePopupEscape);
}

//Обработчик закрытия крестик и оверлей
popupList.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-btn")) {
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

// Кнопки открытия
const buttonAboutProject = document.querySelector(".profile__button-pen");
const buttonAddProject = document.querySelector(".profile__button-plus");

//Попап
const popupProfile = document.querySelector(".popup_type_profile");
const popupAdd = document.querySelector(".popup_type_card-add");

//Попап Профайл
function openPopupProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent; 
  validProfile.resetErrors(formProfile);
  openPopup(popupProfile);
}

//Попап Адд
function openPopupAdd() {
  validAdd.resetErrors(formAddElement);
  openPopup(popupAdd);
}

buttonAboutProject.addEventListener("click", openPopupProfile);
buttonAddProject.addEventListener("click", openPopupAdd);

//Инпуты
const nameAddInput = formAddElement.querySelector(".popup__field_type_title");
const linkAddInput = formAddElement.querySelector(".popup__field_type_link");
const nameInput = formProfile.querySelector(".popup__field_type_name");
const jobInput = formProfile.querySelector(".popup__field_type_about");

//Селекторы Профайла
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

//Функция Профайла
function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup(popupProfile);
}

formProfile.addEventListener("submit", handleProfileSubmit);

//Функция Адд
const handleAddCardSubmit = (e) => {
  e.preventDefault();
  const element = {
    name: nameAddInput.value,
    link: linkAddInput.value,
  };
  renderElement(element, elementsWrap);
  e.target.reset();
  closePopup(popupAdd);
};

const createCard = (item) => {
  const addCard = new Card(
    item,
    "#element-template",
    handleAddCardSubmit
  ).generateCard();
  return addCard;
};

const elementsWrap = document.querySelector(".elements");

const renderElement = (item, elementsWrap) => {
  const template = createCard(item);
  elementsWrap.prepend(template);
};

formAddElement.addEventListener("submit", handleAddCardSubmit);

//Карточки
initialCards.forEach((item) => {
  elementsWrap.append(createCard(item));
});
