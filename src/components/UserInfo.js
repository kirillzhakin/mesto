export default class UserInfo {
  constructor(nameSelector, aboutSelector) {
    this._profileName = nameSelector;
    this._profileAbout = aboutSelector;
  }

  getUserInfo() {
    const itemForm = {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent,
    };
    
    return itemForm;
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileAbout.textContent = data.about;
  }
}
