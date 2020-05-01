const createFilmCardControl = () => {
  return (
    `<form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>`
  );
};

const lengthCheck = (text) => {
  if (text.length > 140) {
    return (text.slice(0, 138) + `...`);
  } else {
    return text;
  }
};

export const createFilmCardTemplate = (filmCard) => {

  const filmCardControl = createFilmCardControl();

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${filmCard.title}</h3>
      <p class="film-card__rating">${filmCard.rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${filmCard.year}</span>
        <span class="film-card__duration">${filmCard.duration}</span>
        <span class="film-card__genre">${filmCard.gentres[0]}</span>
      </p>
      <img src="./images/posters/${filmCard.poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${lengthCheck(filmCard.description)}</p>
      <a class="film-card__comments">${filmCard.comments.length} comments</a>
      ${filmCardControl}
    </article>`
  );
};
