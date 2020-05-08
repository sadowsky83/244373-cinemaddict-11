import AbstractComponent from './abstractComponent.js';

const createFilmDetailsTemplate = (filmCard) => {
  const createNoCommentsBlock = () => {
    return (
      `<ul class="film-details__comments-list"></ul>

      <div class="film-details__new-comment">
        <div for="add-emoji" class="film-details__add-emoji-label">
          <img src="images/emoji/smile.png" width="55" height="55" alt="emoji-smile">
        </div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">Great movie!</textarea>
        </label>

        <div class="film-details__emoji-list">
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" checked>
          <label class="film-details__emoji-label" for="emoji-smile">
            <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
          <label class="film-details__emoji-label" for="emoji-sleeping">
            <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
          <label class="film-details__emoji-label" for="emoji-puke">
            <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
          <label class="film-details__emoji-label" for="emoji-angry">
            <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
          </label>
        </div>
      </div>`
    );
  };

  const createCommentsBlock = () => {

    let comments = [];

    const createComments = () => {

      for (let i = 0; i < filmCard.comments.length; i++) {
        let comment;
        comment = `<li class="film-details__comment">
                    <span class="film-details__comment-emoji">
                      <img src="./images/emoji/${filmCard.comments[i].emoji}" width="55" height="55" alt="emoji-sleeping">
                    </span>
                    <div>
                      <p class="film-details__comment-text">${filmCard.comments[i].text}</p>
                      <p class="film-details__comment-info">
                        <span class="film-details__comment-author">${filmCard.comments[i].name} Doe</span>
                        <span class="film-details__comment-day">${filmCard.comments[i].date} days ago</span>
                        <button class="film-details__comment-delete">Delete</button>
                      </p>
                    </div>
                  </li>`;
        comments.push(comment);
      }
      return comments;
    };

    createComments();

    return (
      `<ul class="film-details__comments-list">
      ${comments.join(``)}
      </ul>
      <div class="film-details__new-comment">
        <div for="add-emoji" class="film-details__add-emoji-label"></div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>

        <div class="film-details__emoji-list">
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
          <label class="film-details__emoji-label" for="emoji-smile">
            <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
          <label class="film-details__emoji-label" for="emoji-sleeping">
            <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
          <label class="film-details__emoji-label" for="emoji-puke">
            <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
          <label class="film-details__emoji-label" for="emoji-angry">
            <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
          </label>
        </div>
      </div>
    </section>`
    );
  };

  let gentres = [];

  const createGentre = () => {
    for (let i = 0; i < filmCard.gentres.length; i++) {
      let gentreItem;
      gentreItem = `<span class="film-details__genre">` + filmCard.gentres[i] + `</span>`;
      gentres.push(gentreItem);
    }
    return gentres;
  };

  createGentre();

  const noCommentsBlock = createNoCommentsBlock();
  const commentsBlock = createCommentsBlock();

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${filmCard.poster}" alt="">

              <p class="film-details__age">${filmCard.age}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${filmCard.title}</h3>
                  <p class="film-details__title-original">Original: ${filmCard.title}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${filmCard.rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${filmCard.directors.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${filmCard.writers.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${filmCard.actors.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${filmCard.day} ${filmCard.month} ${filmCard.year}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${filmCard.duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${filmCard.country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${gentres.join(``)}
                </tr>
              </table>

              <p class="film-details__film-description">
                ${filmCard.description}
              </p>
            </div>
          </div>
          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${filmCard.comments.length}</span></h3>
            ${filmCard.comments.length > 0 ? commentsBlock : noCommentsBlock}
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmDetailsComponent extends AbstractComponent {
  constructor(filmCard) {
    super();

    this._filmCard = filmCard;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._filmCard);
  }
}
