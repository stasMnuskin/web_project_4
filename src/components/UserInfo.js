export class UserInfo {
  constructor({profileName, profileJob}) {
    this._profileName = document.querySelector(profileName);
    this._profileJob = document.querySelector(profileJob);
  };

  getUserInfo() {
    const userInfo = {};
    userInfo["userName"] = this._profileName.textContent;
    userInfo["userJob"] = this._profileJob.textContent;
    return userInfo;
  };
  
  setUserInfo = ({input_name:name, input_job:job}) => {
    this._profileName.textContent = name;
    this._profileJob.textContent = job;
  };
};