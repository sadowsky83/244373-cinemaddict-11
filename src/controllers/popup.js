// Компоненты
import FilmDetailsComponent from '../components/filmDetails.js';

// Утилки
import {render, remove, RenderPosition} from '../utils/render.js';

const popupRender = (card) => {
  const body = document.querySelector(`body`);
  const detailsComponent = new FilmDetailsComponent(card);

  render(body, detailsComponent, RenderPosition.BEFOREEND); // Отрисовка попапа с детальным описанием фильма
  document.addEventListener(`keydown`, onEscKeyDown);

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      remove(detailsComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  detailsComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
    remove(detailsComponent); // Удаление попапа
  });
};

export default class PopupController {
  render(card) {
    popupRender(card);
  }
}
