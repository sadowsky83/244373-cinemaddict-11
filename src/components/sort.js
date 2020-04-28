const createNavigationItem = (sortItem, isActive) => {
  const {name, href} = sortItem;
  return (
    `<li><a href="${href}" class="sort__button${isActive ? ` sort__button--active` : ``}">${name}</a></li>`
  );
};

export const createSortTemplate = (items) => {
  const sortItems = items.map((it, i) => createNavigationItem(it, i === 0)).join(`\n`);
  return (
    `<ul class="sort">
      ${sortItems}
    </ul>`
  );
};
