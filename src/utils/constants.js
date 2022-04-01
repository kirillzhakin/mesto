export const formsValidation = {
    formElement: ".popup__form",
    inputElement: ".popup__field",
    buttonElement: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__field_type_error",
    errorShowClass: "error_type_visible",
  };
  

export const OVERLAY_ACTIVE_CLASS = "popup_opened";
export const popupList = document.querySelectorAll(".popup");

// Формы
export const formProfile = document.querySelector(".popup__form_type_profile");
export const formAddElement = document.querySelector(".popup__form_type_add");

//Инпуты
export const nameAddInput = formAddElement.querySelector(".popup__field_type_title");
export const linkAddInput = formAddElement.querySelector(".popup__field_type_link");
export const nameInput = formProfile.querySelector(".popup__field_type_name");
export const jobInput = formProfile.querySelector(".popup__field_type_about");

//Селекторы Профайла
export const profileName = document.querySelector(".profile__name");
export const profileAbout = document.querySelector(".profile__about");

// Кнопки открытия
export const buttonAboutProject = document.querySelector(".profile__button-pen");
export const buttonAddProject = document.querySelector(".profile__button-plus");

//Попап
export const popupProfile = document.querySelector(".popup_type_profile");
export const popupAdd = document.querySelector(".popup_type_card-add");
export const popupImage = document.querySelector(".popup_type_picture");

