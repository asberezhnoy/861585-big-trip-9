import {TimeStamp, createElement} from './utils';
import EditableTripPoint from './trip-editablepoint';

class TripPoint {
  constructor(type, destination) {
    this.destination = destination;
    this.startDt = null;
    this.finishDt = null;
    this.price = 0;
    this.offers = new Set();
    let _element = null;

    this.getElement = function () {
      if (_element === null) {
        _element = createElement(this.getTemplate()).firstChild;

        _element.querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
          const editCard = new EditableTripPoint(this);
          _element.parentNode.replaceChild(editCard.getElement(), _element);
        });
      }
      return _element;
    };

    this.getType = function () {
      return type;
    };

    this.getTemplate = function () {
      return `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${this.getType()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${this.destination.getName()}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${TimeStamp.toLocaleTimeString(this.startDt)}">${TimeStamp.toLocaleTimeString(this.startDt)}</time>
            &mdash;
            <time class="event__end-time" datetime="${TimeStamp.toLocaleTimeString(this.finishDt)}">${TimeStamp.toLocaleTimeString(this.finishDt)}</time>
          </p>
          <p class="event__duration">${computeDuration(this)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${this.price}</span>
        </p>

        ${cretaeOffersTemplate(this.offers)}

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`;
    };

    function cretaeOffersTemplate(offers) {
      if (offers.size === 0) {
        return ``;
      }

      return `<h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">${Array.from(offers).map((offer) => {
    return offer.getTemplate();
  }).join(``)}
      </ul>`;
    }

    function computeDuration(point) {
      const startDt = new Date(point.startDt);
      const finishDt = new Date(point.finishDt);
      const seconds = (finishDt - startDt) / 1000;
      const days = Math.floor(seconds / (60 * 60 * 24));
      const hours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((seconds - days * (60 * 60 * 24) - hours * (60 * 60)) / 60);

      if (days === 0 && hours === 0) {
        return `${minutes}M`;
      }
      if (days === 0) {
        return `${hours}H ${minutes}M`;
      }
      return `${days}D ${hours}H ${minutes}M`;
    }
  }
}

export {TripPoint as default};
