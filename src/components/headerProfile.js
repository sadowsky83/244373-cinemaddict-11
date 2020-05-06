import AbstractComponent from './abstractComponent.js';

const createHeaderProfileTemplate = (user) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${user.rank}</p>
      <img class="profile__avatar" src="${user.avatar}" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class HeaderProfileComponent extends AbstractComponent {
  constructor(user) {
    super();

    this._user = user;
  }

  getTemplate() {
    return createHeaderProfileTemplate(this._user);
  }
}
