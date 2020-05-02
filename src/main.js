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
// import FilmDetailsComponent from './components/filmDetails.js';
// import CommentComponent from './components/comment.js';

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
const filnCardsSortByDefault = filmCards.slice();
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

const renderFilmCardGalery = (sortCardArray) => {

  let renderCardCount = CARD_RENDER_COUNT_ON_START;

  sortCardArray.slice(0, renderCardCount).forEach((card) => render(filmsListContainer, new FilmCardComponent(card).getElement(), RenderPosition.BEFOREEND)); // Отрисовка карточек с фильмами

  render(filmsList, new ShowMoreComponent().getElement(), RenderPosition.BEFOREEND); // Отрисовка кнопки "Показать больше"

  const filmListShowMore = filmsList.querySelector(`.films-list__show-more`);

  filmListShowMore.addEventListener(`click`, () => {
    const prevRenderCount = renderCardCount;
    renderCardCount += CARD_RENDER_COUNT_BY_BUTTON;

    sortCardArray.slice(prevRenderCount, renderCardCount).forEach((card) => render(filmsListContainer, new FilmCardComponent(card).getElement(), RenderPosition.BEFOREEND));

    if (renderCardCount >= sortCardArray.length) {
      filmListShowMore.remove();
    }
  });
};

renderFilmCardGalery(filnCardsSortByDefault);

filmCardsSortByRating.slice(0, TOP_RATED_CARD_RENDER_COUNT).forEach((card) => render(filmsListContainerTopRated, new FilmCardComponent(card).getElement(), RenderPosition.BEFOREEND));

filmCardsSortByComments.slice(0, MOST_COMMENTED_CARD_RENDER_COUNT).forEach((card) => render(filmsListContainerMostCommented, new FilmCardComponent(card).getElement(), RenderPosition.BEFOREEND));

// const filmCardPosters = filmsList.querySelectorAll(`.film-card__poster`);

// const renderfilmDetails = () => {
//   render(body, new FilmDetailsComponent(filnCardsSortByDefault[0]).getElement(), RenderPosition.BEFOREEND); // Отрисовка попапа с детальным описанием фильма

//   const filmDetails = body.querySelector(`.film-details`);
//   const filmDetailsCommentsList = filmDetails.querySelector(`.film-details__comments-list`);

//   filnCardsSortByDefault[0].comments.slice(0, filnCardsSortByDefault[0].comments.length).forEach((comment) => render(filmDetailsCommentsList, new CommentComponent(comment).getElement(), RenderPosition.BEFOREEND));


//   const filmDetailsCloseBtn = body.querySelector(`.film-details__close-btn`);

//   filmDetailsCloseBtn.addEventListener(`click`, () => {
//     filmDetails.remove();
//   }
//   );
// };
