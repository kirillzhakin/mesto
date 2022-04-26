export default class UserInfo {
  constructor(nameElement, aboutElement, avatarElement) {
    this._nameElement = document.querySelector(nameElement);
    this._aboutElement = document.querySelector(aboutElement);
    this._avatarElement = document.querySelector(avatarElement);
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
    this._avatarElement.style.backgroundImage = `url(${data.avatar})`;
  }

  setAvatarInfo(avatar) {
    this._avatarElement.style.backgroundImage = `url(${avatar})`;
  }
}
