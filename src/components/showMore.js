import AbstractComponent from './abstractComponent.js';

const createFilmListShowMoreTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};


export default class ShowMoreComponent extends AbstractComponent {
  getTemplate() {
    return createFilmListShowMoreTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}


