import AbstractComponent from './abstractComponent.js';

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

export default class SortComponent extends AbstractComponent {
  constructor(items) {
    super();

    this._items = items;
  }

  getTemplate() {
    return createSortTemplate(this._items);
  }
}
