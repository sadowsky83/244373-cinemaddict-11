import {createElement} from '../utils.js';

const createFilmListShowMoreTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class ShowMoreComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmListShowMoreTemplate();
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
