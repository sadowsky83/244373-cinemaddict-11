const CARD_RENDER_COUNT = 5;
const TOP_RATED_CARD_RENDER_COUNT = 2;
const MOST_COMMENTED_CARD_RENDER_COUNT = 2;

import {createHeaderProfileTemplate} from './components/headerProfile.js';
import {createMainNavigationTemplate} from './components/mainNavigation.js';
import {createSortTemplate} from './components/sort.js';
import {createFilmsTemplate} from './components/films.js';
import {createFilmCardTemplate} from './components/filmCard.js';
import {createFilmListShowMoreTemplate} from './components/showMore.js';
import {createFilmDetailsTemplate} from './components/filmDetails.js';

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const body = document.querySelector(`body`);
const header = body.querySelector(`header`);
const main = body.querySelector(`main`);


render(header, createHeaderProfileTemplate());
render(main, createMainNavigationTemplate());
render(main, createSortTemplate());
render(main, createFilmsTemplate());

const films = main.querySelector(`.films`);
const filmsList = films.querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelector(`.films-list__container`);
const filmsListExtra = films.querySelectorAll(`.films-list--extra`);
const filmsListContainerTopRated = filmsListExtra[0].querySelector(`.films-list__container`);
const filmsListContainerMostCommented = filmsListExtra[1].querySelector(`.films-list__container`);

for (let i = 0; i < CARD_RENDER_COUNT; i++) {
  render(filmsListContainer, createFilmCardTemplate());
}

render(filmsList, createFilmListShowMoreTemplate());

for (let i = 0; i < TOP_RATED_CARD_RENDER_COUNT; i++) {
  render(filmsListContainerTopRated, createFilmCardTemplate());
}

for (let i = 0; i < MOST_COMMENTED_CARD_RENDER_COUNT; i++) {
  render(filmsListContainerMostCommented, createFilmCardTemplate());
}

render(body, createFilmDetailsTemplate());
