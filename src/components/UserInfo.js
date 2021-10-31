export class UserInfo {
  constructor({ profileNameSelector, profileJobSelector, avatarSelector }) {
    this._profileNameSelector = document.querySelector(profileNameSelector);
    this._profileJobSelector = document.querySelector(profileJobSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const newUserInfo = {};
    newUserInfo.name = this._profileNameSelector.textContent;
    newUserInfo.about = this._profileJobSelector.textContent;
    return newUserInfo;
  }

  setUserInfo({ userName, userJob }) {
    this._profileNameSelector.textContent = userName;
    this._profileJobSelector.textContent = userJob;
  }
  changeAvatar (userAvatar) {
    this._avatarSelector.style.backgroundImage = `url(${userAvatar})`
  }
}
