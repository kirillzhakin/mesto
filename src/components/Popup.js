import { OVERLAY_ACTIVE_CLASS } from "../utils/constants.js";

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add(OVERLAY_ACTIVE_CLASS);
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._popup.classList.remove(OVERLAY_ACTIVE_CLASS);
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose(event) {
    if (event.key === "Escape") this.close();
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("popup_opened") ||
        evt.target.classList.contains("popup__close-btn")
      ) {
        this.close();
      }
    });
  }
}
