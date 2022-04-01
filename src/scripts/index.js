import "../../src/pages/index.css";

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import { initialCards } from "../utils/initialСards.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  formsValidation,
  formAddElement,
  formProfile,
  nameInput,
  jobInput,
  profileName,
  profileAbout,
  buttonAboutProject,
  buttonAddProject,
} from "../utils/constants.js";

//Валидация формы
const validAdd = new FormValidator(formsValidation, formAddElement);
const validProfile = new FormValidator(formsValidation, formProfile);

validProfile.enableValidation();
validAdd.enableValidation();

//Редактирование профиля

const userProfile = new UserInfo(profileName, profileAbout);

function handleProfileSubmit(userData) {
  userProfile.setUserInfo(userData);
  popupTypeProfile.close();
}

const popupTypeProfile = new PopupWithForm(
  ".popup_type_profile",
  handleProfileSubmit
);

popupTypeProfile.setEventListeners();

// Нажатие на кнопку "Редактировать профиль"
function openPopupProfile() {
  userProfile.getUserInfo();
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  validProfile.resetErrors(formProfile);
  popupTypeProfile.open();
}

buttonAboutProject.addEventListener("click", openPopupProfile);

// Добавление карточки

//Экземпляр формы Адд
const popupTypeAdd = new PopupWithForm(
  ".popup_type_card-add",
  handleCardSubmit
);

function handleCardSubmit(cardData) {
  cardsList.setItem(createCard(cardData));
  popupTypeAdd.close();
}

popupTypeAdd.setEventListeners();

// Нажатие на кнопку "Добавить карточку"
function openPopupAdd() {
  popupTypeAdd.open();
  validAdd.resetErrors(formAddElement);
}

buttonAddProject.addEventListener("click", openPopupAdd);

//Отображение карточек

//Функция открытия попап картинка
function handleCardClick(name, link) {
  popupTypePicture.open(name, link);
}
// Экземпляр формы с картинкой и текcтом
const popupTypePicture = new PopupWithImage(".popup_type_picture");
popupTypePicture.setEventListeners();

// Функция создающая экземпляр класса Card
const createCard = (data) => {
  const card = new Card(
    {
      data: data,
      handleCardClick,
    },
    "#element-template"
  );
  const cardElement = card.generateCard();

  return cardElement;
};

// Константа содержащая в себе все карточки
const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardsList.setItem(createCard(item));
    },
  },
  ".elements"
);

cardsList.renderItems();
