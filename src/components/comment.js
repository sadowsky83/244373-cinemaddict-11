import {createElement} from '../utils.js';

const createComment = (comment) => {
  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${comment.emoji}" width="55" height="55" alt="emoji-sleeping">
      </span>
      <div>
        <p class="film-details__comment-text">${comment.text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.name} Doe</span>
          <span class="film-details__comment-day">${comment.date} days ago</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

export default class ComCommentComponentment {
  constructor(comment) {
    this._comment = comment;

    this._element = null;
  }

  getTemplate() {
    return createComment(this._comment);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
