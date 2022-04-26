export default class Card {
  constructor(
    data,
    handleCardClick,
    { handleLikeClick, handleCardDelete },
    currentId,
    cardSelector
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._currentId = currentId;
    this._ownerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleCardDelete = handleCardDelete;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  _getView() {
    if (this._ownerId !== this._currentId) {
      this._element
        .querySelector(".element__trash")
        .classList.add("element__trash_block");
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".element__title").textContent = this._name;
    this._element.querySelector(".element__photo").src = this._link;
    this._element.querySelector(".element__photo").alt = this._name;
    this._element.querySelector(".element__heart-number").textContent =
      this._likes.length;
    this._getView();
    return this._element;
  }

  isLiked() {
    return this._isLiked;
  }

  setLike(data) {
    this._isLiked =
      data.likes.filter((item) => {
        return item._id == this._currentId;
      }).length > 0;
    this._element.querySelector(".element__heart-number").textContent =
      data.likes.length;
    if (this._isLiked) {
      this._element
        .querySelector(".element__heart")
        .classList.add("element__heart_active");
    } else {
      this._element
        .querySelector(".element__heart")
        .classList.remove("element__heart_active");
    }
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__heart")
      .addEventListener("click", () => this._handleLikeClick());
    this._element
      .querySelector(".element__trash")
      .addEventListener("click", () => this._handleCardDelete());
    this._element
      .querySelector(".element__photo")
      .addEventListener("click", () =>
        this._handleCardClick(this._name, this._link)
      );
  }
}
