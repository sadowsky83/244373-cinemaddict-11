const CARD_RENDER_COUNT = 20; // Количество карточек с фильмами
const CARD_RENDER_COUNT_ON_START = 5; // Количество отрисованных карточек при загрузке
const CARD_RENDER_COUNT_BY_BUTTON = 5; // Количество карточек, добавляемых при нажатии load more
const TOP_RATED_CARD_RENDER_COUNT = 2; // Количество карточек в блоке топ рейтинг
const MOST_COMMENTED_CARD_RENDER_COUNT = 2; // Количество карточек в блоке самые комментируемые

// Компоненты
import HeaderProfileComponent from './components/headerProfile.js';
import MainNavigationComponent from './components/mainNavigation.js';
import SortComponent from './components/sort.js';
import FilmsComponent from './components/films.js';
import FilmCardComponent from './components/filmCard.js';
import ShowMoreComponent from './components/showMore.js';
import FilmDetailsComponent from './components/filmDetails.js';
import NoFilmsComponent from './components/noFilms.js';

// Моки
import {generateNavigation} from './mock/generateNavigationItems.js';
import {generateSortItems} from './mock/generateSortItems.js';
import {generateUserProfile} from './mock/user.js';
import {generateFilmCards} from './mock/filmCard.js';

// Утилки
import {render, RenderPosition} from './utils.js';

const navigationItems = generateNavigation();
const sortItems = generateSortItems();
const userProfile = generateUserProfile();
const filmCards = generateFilmCards(CARD_RENDER_COUNT);
const filmCardsSortByDefault = filmCards.slice();
const filmCardsSortByRating = filmCards.sort((a, b) => b.rating - a.rating).slice();
const filmCardsSortByComments = filmCards.sort((a, b) => b.comments.length - a.comments.length).slice();

const body = document.querySelector(`body`);
const header = body.querySelector(`header`);
const main = body.querySelector(`main`);

render(header, new HeaderProfileComponent(userProfile).getElement(), RenderPosition.BEFOREEND); // Отрисовка профиля
render(main, new MainNavigationComponent(navigationItems).getElement(), RenderPosition.BEFOREEND); // Отрисовка блока навигации
render(main, new SortComponent(sortItems).getElement(), RenderPosition.BEFOREEND); // Отрисовка блока сортировки
render(main, new FilmsComponent().getElement(), RenderPosition.BEFOREEND); // Отрисовка блока карточек фильмов

const films = main.querySelector(`.films`);
const filmsList = films.querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelector(`.films-list__container`);
const filmsListExtra = films.querySelectorAll(`.films-list--extra`);
const filmsListContainerTopRated = filmsListExtra[0].querySelector(`.films-list__container`);
const filmsListContainerMostCommented = filmsListExtra[1].querySelector(`.films-list__container`);

const renderCards = (cardsArray, container) => {
  cardsArray.forEach((card) => {
    const cardComponent = new FilmCardComponent(card);
    const detailsComponent = new FilmDetailsComponent(card);

    render(container, cardComponent.getElement(), RenderPosition.BEFOREEND); // Отрисовка карточек из массива

    cardComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, () => {
      render(body, detailsComponent.getElement(), RenderPosition.BEFOREEND); // Отрисовка попапа с детальным описанием фильма
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    const removeDetailsComponent = () => {
      detailsComponent.removeElement();
    };

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        removeDetailsComponent();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    detailsComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
      removeDetailsComponent(); // Удаление попапа
    });
  });
};

const renderFilmCardGalery = (cardsArray) => {

  let renderCardCount = CARD_RENDER_COUNT_ON_START;

  renderCards(cardsArray.slice(0, renderCardCount), filmsListContainer); // Отрисовка основной галлереи
  render(filmsList, new ShowMoreComponent().getElement(), RenderPosition.BEFOREEND); // Отрисовка кнопки "Показать больше"

  const filmListShowMore = filmsList.querySelector(`.films-list__show-more`);

  filmListShowMore.addEventListener(`click`, () => {
    const prevRenderCount = renderCardCount;
    renderCardCount += CARD_RENDER_COUNT_BY_BUTTON;

    renderCards(cardsArray.slice(0, prevRenderCount), filmsListContainer);

    if (renderCardCount >= cardsArray.length) {
      filmListShowMore.remove();
    }
  });
};

const renderMainGallery = () => {
  if (filmCards.length === 0) {
    render(main, new NoFilmsComponent().getElement(), RenderPosition.BEFOREEND);
    return;
  } else {
    renderFilmCardGalery(filmCardsSortByDefault);

    renderCards(filmCardsSortByRating.slice(0, TOP_RATED_CARD_RENDER_COUNT), filmsListContainerTopRated);

    renderCards(filmCardsSortByComments.slice(0, MOST_COMMENTED_CARD_RENDER_COUNT), filmsListContainerMostCommented);
  }
};

renderMainGallery();
