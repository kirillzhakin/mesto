export const formsValidation = {
  formElement: ".popup__form",
  inputElement: ".popup__field",
  buttonElement: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__field_type_error",
  errorShowClass: "error_type_visible",
};

export const OVERLAY_ACTIVE_CLASS = "popup_opened";

// Формы
export const formProfile = document.querySelector(".popup__form_type_profile");
export const formAddElement = document.querySelector(".popup__form_type_add");
export const formChangeAvatar = document.querySelector(".popup_type_card-avatar");

//Инпуты
export const nameInput = formProfile.querySelector(".popup__field_type_name");
export const jobInput = formProfile.querySelector(".popup__field_type_about");

//Селекторы Профайла
export const profileName = ".profile__name";
export const profileAbout = ".profile__about";
export const avatarImage = document.querySelector(".profile__avatar-picture");

// Кнопки открытия
export const buttonAboutProject = document.querySelector(".profile__button-pen");
export const buttonAddProject = document.querySelector(".profile__button-plus");
export const buttonChangeAvatar = document.querySelector(".profile__button-avatar");


// Сабмит
export const allSavedSubmits = document.querySelectorAll('.popup__button_type_save');

//Личная информация
export const token = '84de48d5-ee06-4635-a9d3-6fdec2b04ec2';
export const url = 'https://mesto.nomoreparties.co/v1/cohort-38/';

