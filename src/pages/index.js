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

const userInfo = new UserInfo(profileName, profileAbout, avatarImage);
const popupTypePicture = new PopupWithImage(".popup_type_picture");
const popupTypeDelete = new PopupWithSubmit(".popup_type_card-delete");

//Добавить карточку
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

//Редактировать профиль
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

// Редактировать Аватар
const popupTypeAvatar = new PopupWithForm(".popup_type_card-avatar", (item) => {
  renderLoading(true);
  api
    .setAvatar(item)
    .then((data) => {
      userInfo.setAvatarInfo(data.avatar);
      popupTypeAvatar.close();
    })
    .catch((err) => {
      console.log(`${err}`);
    })
    .finally(() => {
      renderLoading(false);
    });
});

// Нажатие на кнопку "Редактировать профиль"
function openPopupProfile() {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
  validProfile.resetErrors(formProfile);
  popupTypeProfile.open();
}

//Нажатие на кнопку изменить Аватар
function openPopupAvatar() {
  const avatarData = userInfo.getUserInfo();
  validAvatar.resetErrors(formChangeAvatar);
  popupTypeAvatar.open(avatarData);
}

// Нажатие на кнопку "Добавить карточку"
function openPopupAdd() {
  validAdd.resetErrors(formAddElement);
  popupTypeAdd.open();
}

// Удаление карточки
function handleCardDelete(card) {
  popupTypeDelete.setFormSubmitHandler(() => {
    api
      .deleteCard(card._cardId)
      .then(() => {
        card.removeCard();
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

// Функция создающая экземпляр класса Card
function newCardMaker(data, currentUserId, cardsList) {
  const card = new Card(
    data,
    handleCardClick,
    {
      handleLikeClick: () => handleLikeClick(card, data),
      handleCardDelete: () => handleCardDelete(card),
    },
    currentUserId,
    "#element-template"
  );
  const cardElement = card.generateCard();
  card.setLike(data);
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

//Слушатели событий
popupTypeProfile.setEventListeners();
popupTypeAvatar.setEventListeners();
popupTypeAdd.setEventListeners();
popupTypePicture.setEventListeners();
popupTypeDelete.setEventListeners();

// Открытие попапов при нажатии на кнопку
buttonAboutProject.addEventListener("click", openPopupProfile);
buttonChangeAvatar.addEventListener("click", openPopupAvatar);
buttonAddProject.addEventListener("click", openPopupAdd);

// Подключение Api
const api = new Api({
  baseUrl: url,
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
});

//Загрузка данных с сервера информации о пользователе и карточек
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cards, userData]) => {
    userInfo.setUserInfo(userData);
    currentUserId = userData._id;
    cardsList.renderItems(cards);
  })
  .catch((err) => {
    console.log(`${err}`);
  });
