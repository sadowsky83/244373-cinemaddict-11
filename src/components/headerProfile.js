import {createElement} from '../utils.js';

const createHeaderProfileTemplate = (user) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${user.rank}</p>
      <img class="profile__avatar" src="${user.avatar}" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class HeaderProfileComponent {
  constructor(user) {
    this._user = user;

    this._element = null;
  }

  getTemplate() {
    return createHeaderProfileTemplate(this._user);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
