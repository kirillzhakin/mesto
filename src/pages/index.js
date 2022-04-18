import "../../src/pages/index.css";

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  formsValidation,
  formAddElement,
  formProfile,
  formChangeAvatar,
  nameInput,
  jobInput,
  profileName,
  profileAbout,
  buttonAboutProject,
  buttonAddProject,
  buttonChangeAvatar,
  avatarImage,
  allSavedSubmits,
  url,
  token,
} from "../utils/constants.js";

let currentUserId = null;

//Валидация формы
const validAdd = new FormValidator(formsValidation, formAddElement);
const validProfile = new FormValidator(formsValidation, formProfile);
const validAvatar = new FormValidator(formsValidation, formChangeAvatar);

validProfile.enableValidation();
validAdd.enableValidation();
validAvatar.enableValidation();

//Редактирование профиля
const userInfo = new UserInfo(profileName, profileAbout);

const popupTypeProfile = new PopupWithForm(".popup_type_profile", (item) => {
  renderLoading(true);
  api
    .setUserInfo(item)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupTypeProfile.close();
    })
    .catch((err) => {
      console.log(`${err}`);
    })
    .finally(() => {
      renderLoading(false);
    });
});

popupTypeProfile.setEventListeners();

// Нажатие на кнопку "Редактировать профиль"
function openPopupProfile() {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
  validProfile.resetErrors(formProfile);
  popupTypeProfile.open();
}

buttonAboutProject.addEventListener("click", openPopupProfile);

// Редактировать Аватар

const popupTypeAvatar = new PopupWithForm(".popup_type_card-avatar", (item) => {
  renderLoading(true);
  debugger;
  api
    .setAvatar(item)
    .then((data) => {
      avatarImage.style.backgroundImage = `url(${data.avatar})`;
      popupTypeAvatar.close();
    })
    .catch((err) => {
      console.log(`${err}`);
    })
    .finally(() => {
      renderLoading(false);
    });
});

popupTypeAvatar.setEventListeners();

//Нажатие на кнопку изменить Аватар
function openPopupAvatar() {
  validAvatar.resetErrors(formChangeAvatar);
  popupTypeAvatar.open();
}

buttonChangeAvatar.addEventListener("click", openPopupAvatar);

// Добавление карточки

//Экземпляр формы Адд
const popupTypeAdd = new PopupWithForm(".popup_type_card-add", (item) => {
  renderLoading(true);
  api
    .createCard(item)
    .then((data) => {
      newCardMaker(data, currentUserId, cardsList);
      popupTypeAdd.close();
    })
    .catch((err) => {
      console.log(`${err}`);
    })
    .finally(() => {
      renderLoading(false);
    });
});

popupTypeAdd.setEventListeners();

// Нажатие на кнопку "Добавить карточку"
function openPopupAdd() {
  validAdd.resetErrors(formAddElement);
  popupTypeAdd.open();
}

buttonAddProject.addEventListener("click", openPopupAdd);

// Удаление карточки

const popupTypeDelete = new PopupWithSubmit(".popup_type_card-delete");
popupTypeDelete.setEventListeners();

function handleCardDelete(card) {
  popupTypeDelete.setFormSubmitHandler(() => {
    api
      .deleteCard(card._id)
      .then(() => {
        card.deleteCard();
        popupTypeDelete.close();
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  });
  popupTypeDelete.open();
}

// Улучшенный UX всех форм
function renderLoading(isLoading) {
  if (isLoading) {
    Array.from(allSavedSubmits).forEach((submit) => {
      submit.value = "Сохранение...";
    });
  } else {
    Array.from(allSavedSubmits).forEach((submit) => {
      submit.value = "Сохранить";
    });
  }
}

//Отображение карточек

//Функция открытия попап картинка
function handleCardClick(name, link) {
  popupTypePicture.open(name, link);
}

//Функция ЛайкКлик
function handleLikeClick(card, data) {
  const promise = card.isLiked()
    ? api.dislikeCard(data._id)
    : api.likeCard(data._id);
  promise
    .then((data) => {
      card.setLike(data);
    })
    .catch((err) => {
      console.log(`${err}`);
    });
}

// Экземпляр формы с картинкой и текcтом
const popupTypePicture = new PopupWithImage(".popup_type_picture");
popupTypePicture.setEventListeners();

// Функция создающая экземпляр класса Card

function newCardMaker(data, currentUserId, cardsList) {
  const newCard = new Card(
    data,
    handleCardClick,
    {
      handleLikeClick: () => handleLikeClick(newCard, data),
      handleCardDelete: () => handleCardDelete(newCard),
    },
    currentUserId,
    "#element-template"
  );
  const cardElement = newCard.generateCard();
  newCard.setLike(data);
  cardsList.setItem(cardElement);
}

// Константа содержащая в себе все карточки
const cardsList = new Section(
  {
    renderer: (item) => {
      newCardMaker(item, currentUserId, cardsList);
    },
  },
  ".elements"
);

// Подключение Api
const api = new Api({
  baseUrl: url,
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
});

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cards, userData]) => {
    userInfo.setUserInfo(userData);
    avatarImage.style.backgroundImage = `url(${userData.avatar})`;
    currentUserId = userData._id;
    debugger;
    cardsList.renderItems(cards);
  })
  .catch((err) => {
    console.log(`${err}`);
  });
