import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__picture");
    this._text = this._popup.querySelector(".popup__title-picture");
  }

  open(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._text.textContent = name;
    super.open();
  }
}
