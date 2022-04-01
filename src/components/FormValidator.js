export default class FormValidator {
  constructor(formsValidation, targetFormElement) {
    this._formElement = formsValidation.formElement;
    this._inputElement = formsValidation.inputElement;
    this._buttonElement = formsValidation.buttonElement;
    this._inactiveButtonClass = formsValidation.inactiveButtonClass;
    this._inputErrorClass = formsValidation.inputErrorClass;
    this._errorShowClass = formsValidation.errorShowClass;
    this._errorClass = formsValidation.errorClass;

    this._targetFormElement = targetFormElement;

    this._inputList = Array.from(targetFormElement.querySelectorAll(this._inputElement)); 
    this._button = targetFormElement.querySelector(this._buttonElement);
  }

  _showInputError(input, errorMessage) {
    const errorElement = this._targetFormElement.querySelector(
      `#${input.id}-error`
    );
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorShowClass);
  }

  _hideInputError(input) {
    const errorElement = this._targetFormElement.querySelector(
      `#${input.id}-error`
    );
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorShowClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  }

  _setEventListeners() {    
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._button);
      });
    });
  }

  resetErrors() {   
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState(this._inputList, this._button);
  }

  enableValidation() {
    this.resetErrors(this._targetFormElement);
    this._setEventListeners(this._targetFormElement);
  }
}
