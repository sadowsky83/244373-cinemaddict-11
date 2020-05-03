import {createElement} from '../utils.js';

const createNavigationItem = (sortItem, isActive) => {
  const {name, href} = sortItem;
  return (
    `<li><a href="${href}" class="sort__button${isActive ? ` sort__button--active` : ``}">${name}</a></li>`
  );
};

const createSortTemplate = (items) => {
  const sortItems = items.map((it, i) => createNavigationItem(it, i === 0)).join(`\n`);
  return (
    `<ul class="sort">
      ${sortItems}
    </ul>`
  );
};

export default class SortComponent {
  constructor(items) {
    this._items = items;

    this._element = null;
  }

  getTemplate() {
    return createSortTemplate(this._items);
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
