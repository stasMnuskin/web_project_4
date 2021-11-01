const customFetch = (url, headers) => {
  return fetch(url, headers).then((result) => {
    if (result.ok) {
      return result.json();
    }
    Promise.reject(`Error: ${result.status}`);
  });
};

class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  getInitialCards() {
    return customFetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }
  getUserInfo() {
    return customFetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }
  createCard(data) {
    return customFetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name: data.name, link: data.link }),
    });
  }
  updateProfile(data) {
    return customFetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name: data.input_name, about: data.input_job }),
    });
  }
  deleteCard(cardId) {
    return customFetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
  likeCard(cardId) {
    return customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    });
  }
  deleteLike(cardId) {
    return customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
  changeAvatar(avatar) {
    return customFetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: avatar.link }),
    });
  }
}

export const api = new Api("https://around.nomoreparties.co/v1/group-12", {
  authorization: "58a0c9dd-0104-421e-8188-69fa2ff9ad79",
  "Content-Type": "application/json",
});
