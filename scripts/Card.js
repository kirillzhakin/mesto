const popupImagePhoto = document.querySelector(".popup__picture");
const popupImageTitle = document.querySelector(".popup__title-picture");
const popupImage = document.querySelector(".popup_type_picture");

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._alt = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".element__title").textContent = this._name;
    this._element.querySelector(".element__photo").src = this._link;
    this._element.querySelector(".element__photo").alt = this._name;
    return this._element;
  }

  _handleHeartClick() {
    this._element
      .querySelector(".element__heart")
      .classList.toggle("element__heart_active");
  }

  _handleTrashClick() {
    this._element.querySelector(".element__trash").closest(".element").remove();
  }

   _handleOpenPopup() {
    popupImagePhoto.src = this._link;
    popupImagePhoto.alt = this._name;
    popupImageTitle.textContent = this._name;
    popupImage.classList.add('popup_opened');
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__heart")
      .addEventListener("click", () => {
        this._handleHeartClick();
      });

    this._element
      .querySelector(".element__trash")
      .addEventListener("click", () => {
        this._handleTrashClick();
      });

    this._element
      .querySelector(".element__photo")
      .addEventListener("click", () => {
        this._handleOpenPopup();
      });
  }
}


