export class UserInfo {
  constructor({profileName, profileJob}) {
    this._profileName = document.querySelector(profileName);
    this._profileJob = document.querySelector(profileJob);
    this.setUserInfo = this.setUserInfo.bind(this);
  };
  getUserInfo() {
    const userInfo = {};
    userInfo["userName"] = this._profileName.textContent;
    userInfo["userJob"] = this._profileJob.textContent;
    return userInfo;
  };
  setUserInfo(data) {
    const {name, job} = data;
    this._profileName = name;
    this._profileJob = job;
  };
};