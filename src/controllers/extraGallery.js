const CARD_RENDER_COUNT = 2;

// Компоненты
import FilmCardComponent from '../components/filmCard.js';

import PopupController from "../controllers/popup.js";

// Утилки
import {render, RenderPosition} from '../utils/render.js';

const renderExtraGallery = (container, cardsArray) => {

  cardsArray.forEach((card) => {
    const cardComponent = new FilmCardComponent(card);

    render(cardsArray.slice(0, CARD_RENDER_COUNT), container, RenderPosition.BEFOREEND); // Отрисовка карточек из массива

    cardComponent.setClickHandler(() => {
      const popupController = new PopupController(card);
      popupController.render(card);
    });
  });
};

export default class ExtralleryController {
  constructor(container) {
    this._container = container;
  }

  render(cardsArray) {
    renderExtraGallery(this._container, cardsArray);
  }
}

