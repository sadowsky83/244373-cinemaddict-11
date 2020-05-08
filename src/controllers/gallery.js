const CARD_RENDER_COUNT_ON_START = 5; // Количество отрисованных карточек при загрузке
const CARD_RENDER_COUNT_BY_BUTTON = 5; // Количество карточек, добавляемых при нажатии load more

// Компоненты
import FilmCardComponent from '../components/filmCard.js';
import ShowMoreComponent from '../components/showMore.js';
import NoFilmsComponent from '../components/noFilms.js';

import PopupController from "../controllers/popup.js";

// Утилки
import {render, remove, RenderPosition} from '../utils/render.js';

const renderGallery = (container, cardsArray) => {

  const renderCards = (cards) => {
    cards.forEach((card) => {
      const cardComponent = new FilmCardComponent(card);

      render(container, cardComponent, RenderPosition.BEFOREEND); // Отрисовка карточек из массива

      cardComponent.setClickHandler(() => {
        const popupController = new PopupController(card);
        popupController.render(card);
      });
    });
  };

  const renderFilmCardGalery = () => {

    let renderCardCount = CARD_RENDER_COUNT_ON_START;

    renderCards(cardsArray.slice(0, renderCardCount), container); // Отрисовка основной галлереи

    const filmListShowMore = new ShowMoreComponent();

    render(container.parentNode, filmListShowMore, RenderPosition.BEFOREEND); // Отрисовка кнопки "Показать больше"

    filmListShowMore.setClickHandler(() => {

      const prevRenderCount = renderCardCount;

      renderCardCount += CARD_RENDER_COUNT_BY_BUTTON;

      renderCards(cardsArray.slice(prevRenderCount, renderCardCount), container);

      if (renderCardCount >= cardsArray.length) {
        remove(filmListShowMore);
      }
    });
  };

  const renderMainGallery = () => {
    const main = document.querySelector(`main`);

    if (cardsArray.length === 0) {
      render(main, new NoFilmsComponent(), RenderPosition.BEFOREEND);
      return;
    } else {
      renderFilmCardGalery();
    }
  };

  renderMainGallery();
};

export default class GalleryController {
  constructor(container) {
    this._container = container;
  }

  render(cardsArray) {
    renderGallery(this._container, cardsArray);
  }
}
