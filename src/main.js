const CARD_RENDER_COUNT = 20; // Количество карточек с фильмами
const CARD_RENDER_COUNT_ON_START = 5;
const CARD_RENDER_COUNT_BY_BUTTON = 5;
const TOP_RATED_CARD_RENDER_COUNT = 2; // Количество карточек в блоке топ рейтинг
const MOST_COMMENTED_CARD_RENDER_COUNT = 2; // Количество карточек в блоке самые комментируемые

// Компоненты
import {createHeaderProfileTemplate} from './components/headerProfile.js';
import {createMainNavigationTemplate} from './components/mainNavigation.js';
import {createSortTemplate} from './components/sort.js';
import {createFilmsTemplate} from './components/films.js';
import {createFilmCardTemplate} from './components/filmCard.js';
import {createFilmListShowMoreTemplate} from './components/showMore.js';
import {createFilmDetailsTemplate} from './components/filmDetails.js';
// import {createComment} from './components/comment.js';

// Моки
import {generateNavigation} from './mock/generateNavigationItems.js';
import {generateSortItems} from './mock/generateSortItems.js';
import {generateUserProfile} from './mock/user.js';
import {generateFilmCards} from './mock/filmCard.js';

const navigationItems = generateNavigation();
const sortItems = generateSortItems();
const userProfile = generateUserProfile();
const filmCards = generateFilmCards(CARD_RENDER_COUNT);
const filnCardsSortByDefault = filmCards;
const filmCardsSortByRating = filmCards.sort((a, b) => b.rating - a.rating);
const filmCardsSortByComments = filmCards.sort((a, b) => b.comments.length - a.comments.length);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const body = document.querySelector(`body`);
const header = body.querySelector(`header`);
const main = body.querySelector(`main`);


render(header, createHeaderProfileTemplate(userProfile)); // Отрисовка профиля
render(main, createMainNavigationTemplate(navigationItems)); // Отрисовка блока навигации
render(main, createSortTemplate(sortItems)); // Отрисовка блока сортировки
render(main, createFilmsTemplate()); // Отрисовка блока карточек фильмов

const films = main.querySelector(`.films`);
const filmsList = films.querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelector(`.films-list__container`);
const filmsListExtra = films.querySelectorAll(`.films-list--extra`);
const filmsListContainerTopRated = filmsListExtra[0].querySelector(`.films-list__container`);
const filmsListContainerMostCommented = filmsListExtra[1].querySelector(`.films-list__container`);

let renderCardCount = CARD_RENDER_COUNT_ON_START;

filnCardsSortByDefault.slice(0, renderCardCount).forEach((card) => render(filmsListContainer, createFilmCardTemplate(card))); // Отрисовка карточек с фильмами

render(filmsList, createFilmListShowMoreTemplate()); // Отрисовка кнопки "Показать больше"

filmCardsSortByRating.slice(0, TOP_RATED_CARD_RENDER_COUNT).forEach((card) => render(filmsListContainerTopRated, createFilmCardTemplate(card)));

filmCardsSortByComments.slice(0, MOST_COMMENTED_CARD_RENDER_COUNT).forEach((card) => render(filmsListContainerMostCommented, createFilmCardTemplate(card)));

const filmListShowMore = filmsList.querySelector(`.films-list__show-more`);

filmListShowMore.addEventListener(`click`, () => {
  const prevRenderCount = renderCardCount;
  renderCardCount += CARD_RENDER_COUNT_BY_BUTTON;

  filnCardsSortByDefault.slice(prevRenderCount, renderCardCount).forEach((card) => render(filmsListContainer, createFilmCardTemplate(card)));

  if (renderCardCount >= filnCardsSortByDefault.length) {
    filmListShowMore.remove();
  }
});

const filmCardPoster = filmsList.querySelector(`.film-card__poster`);

filmCardPoster.addEventListener(`click`, () => {
  render(body, createFilmDetailsTemplate(filnCardsSortByDefault[0])); // Отрисовка попапа с детальным описанием фильма

  const filmDetails = body.querySelector(`.film-details`);
  // const filmDetailsCommentsList = filmDetails.querySelector(`.film-details__comments-list`);

  // filnCardsSortByDefault[0].comments.slice(0, filnCardsSortByDefault[0].comments.length).forEach((comment) => render(filmDetailsCommentsList, createComment(comment)));


  const filmDetailsCloseBtn = body.querySelector(`.film-details__close-btn`);

  filmDetailsCloseBtn.addEventListener(`click`, () => {
    filmDetails.remove();
  }
  );
}
);


