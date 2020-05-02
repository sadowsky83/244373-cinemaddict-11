import {createElement} from '../utils.js';

const createNavigationItem = (name, href, count) => {
  return (
    `<a href="#${href}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>`
  );
};

const createMainNavigationTemplate = (items) => {
  const navigationItems = items.map((it) => createNavigationItem(it.name, it.href, it.count)).join(`\n`);
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${navigationItems}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class MainNavigationComponent {
  constructor(items) {
    this._items = items;

    this._element = null;
  }

  getTemplate() {
    return createMainNavigationTemplate(this._items);
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
