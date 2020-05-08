const CARD_RENDER_COUNT = 20; // Количество карточек с фильмами

// Компоненты
import HeaderProfileComponent from './components/headerProfile.js';
import MainNavigationComponent from './components/mainNavigation.js';
import SortComponent from './components/sort.js';
import FilmsComponent from './components/films.js';

import GalleryController from "./controllers/gallery.js";
import ExtralleryController from "./controllers/extraGallery.js";

// Моки
import {generateNavigation} from './mock/generateNavigationItems.js';
import {generateSortItems} from './mock/generateSortItems.js';
import {generateUserProfile} from './mock/user.js';
import {generateFilmCards} from './mock/filmCard.js';

// Утилки
import {render, RenderPosition} from './utils/render.js';

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

render(header, new HeaderProfileComponent(userProfile), RenderPosition.BEFOREEND); // Отрисовка профиля
render(main, new MainNavigationComponent(navigationItems), RenderPosition.BEFOREEND); // Отрисовка блока навигации
render(main, new SortComponent(sortItems), RenderPosition.BEFOREEND); // Отрисовка блока сортировки
render(main, new FilmsComponent(), RenderPosition.BEFOREEND); // Отрисовка блока карточек фильмов

const films = main.querySelector(`.films`);
const filmsList = films.querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelector(`.films-list__container`);
const filmsListExtra = films.querySelectorAll(`.films-list--extra`);
const filmsListContainerTopRated = filmsListExtra[0].querySelector(`.films-list__container`);
const filmsListContainerMostCommented = filmsListExtra[1].querySelector(`.films-list__container`);

const galleryController = new GalleryController(filmsListContainer, filmCardsSortByDefault);
galleryController.render(filmCardsSortByDefault);

const topRatedGaleryController = new ExtralleryController(filmsListContainerTopRated, filmCardsSortByRating);
topRatedGaleryController.render(filmCardsSortByRating);

const topCommentedGaleryController = new ExtralleryController(filmsListContainerMostCommented, filmCardsSortByComments);
topCommentedGaleryController.render(filmCardsSortByComments);
