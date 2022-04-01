export default class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._name = data.name;
    this._alt = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
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
    this._element.remove();
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
        this._handleCardClick(this._name, this._link);
      });
  }
}
