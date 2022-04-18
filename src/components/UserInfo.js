export default class UserInfo {
  constructor(nameElement, aboutElement) {
    this._nameElement = document.querySelector(nameElement);
    this._aboutElement = document.querySelector(aboutElement);
  }

  getUserInfo() {
    const itemForm = {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
    };
    return itemForm;
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._aboutElement.textContent = data.about;    
  }
}
