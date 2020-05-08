const CARD_RENDER_COUNT = 2;

// Компоненты
import FilmCardComponent from '../components/filmCard.js';

import PopupController from "../controllers/popup.js";

// Утилки
import {render, RenderPosition} from '../utils/render.js';

const renderExtraGallery = (container, cardsArray) => {

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

    let renderCardCount = CARD_RENDER_COUNT;

    renderCards(cardsArray.slice(0, renderCardCount), container); // Отрисовка основной галлереи
  };

  renderFilmCardGalery();
};

export default class ExtralleryController {
  constructor(container) {
    this._container = container;
  }

  render(cardsArray) {
    renderExtraGallery(this._container, cardsArray);
  }
}

