import {AvailableOffers} from './offer';
import {TimeStamp, createElement} from './utils';
import AbstractComponent from './AbstractComponent';

const KEYCODES_ESCAPE = 27;

class EditableTripPoint extends AbstractComponent {
  constructor(point) {
    super();

    const _self = this;

    this.getElement = function () {
      if (this._element === null) {
        this._element = createElement(this.getTemplate()).firstChild;

        this._element.querySelector(`.event--edit`).addEventListener(`submit`, () => {
          close();
        });
        document.addEventListener(`keydown`, onDocumentKeyDown);
      }
      return this._element;
    };

    this.getTemplate = function () {
      return `<li class="trip-events__item">
        <form class="event  event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-1">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${point.getType()}.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
      
              <div class="event__type-list">
                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Transfer</legend>
      
                  <div class="event__type-item">
                    <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                    <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                  </div>
      
                  <div class="event__type-item">
                    <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                    <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                  </div>
      
                  <div class="event__type-item">
                    <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                    <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                  </div>
      
                  <div class="event__type-item">
                    <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                    <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                  </div>
      
                  <div class="event__type-item">
                    <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                    <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
                  </div>
      
                  <div class="event__type-item">
                    <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                    <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                  </div>
      
                  <div class="event__type-item">
                    <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                    <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                  </div>
                </fieldset>
      
                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Activity</legend>
      
                  <div class="event__type-item">
                    <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                    <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                  </div>
      
                  <div class="event__type-item">
                    <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                    <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                  </div>
      
                  <div class="event__type-item">
                    <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                    <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                  </div>
                </fieldset>
              </div>
            </div>
      
            <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-1">
                Sightseeing at
              </label>
              <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${point.destination.getName()}" list="destination-list-1">
              <datalist id="destination-list-1">
                <option value="Amsterdam"></option>
                <option value="Geneva"></option>
                <option value="Chamonix"></option>
              </datalist>
            </div>
      
            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-1">
                From
              </label>
              <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${TimeStamp.toLocaleString(point.startDt)}">
              &mdash;
              <label class="visually-hidden" for="event-end-time-1">
                To
              </label>
              <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${TimeStamp.toLocaleString(point.finishDt)}">
            </div>
      
            <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-1">
                <span class="visually-hidden">Price</span>
                &euro;
              </label>
              <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${point.price}">
            </div>
      
            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">Delete</button>
      
            <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked>
            <label class="event__favorite-btn" for="event-favorite-1">
              <span class="visually-hidden">Add to favorite</span>
              <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
              </svg>
            </label>
      
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </header>
      
          <section class="event__details">
      
            <section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      
              <div class="event__available-offers">
                ${AvailableOffers.map((offer) => {
    return `<div class="event__offer-selector">
                  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.getName()}-1" type="checkbox" name="event-offer-${offer.getName()}" ${Array.from(point.offers).some((element) => element.getTitle() === offer.getTitle()) ? `checked` : ``}>
                  <label class="event__offer-label" for="event-offer-${offer.getName()}-1">
                    <span class="event__offer-title">${offer.getTitle()}</span>
                    &plus;
                    &euro;&nbsp;<span class="event__offer-price">${offer.getPrice()}</span>
                  </label>
                </div>`;
  }).join(``)}
              </div>
            </section>
      
            <section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${point.destination.getDescription()}</p>
      
              <div class="event__photos-container">
                <div class="event__photos-tape">
                  ${Array.from(point.destination.getPictures()).map((picture) => {
    return `<img class="event__photo" src="${picture.getSrc()}" alt="Event photo">`;
  }).join(``)}
                </div>
              </div>
            </section>
          </section>
        </form>
      </li>`;
    };

    function onDocumentKeyDown(evt) {
      if (evt.keyCode === KEYCODES_ESCAPE) {
        document.removeEventListener(`keydown`, onDocumentKeyDown);
        close();
      }
    }

    function close() {
      _self._element.parentNode.replaceChild(point.getElement(), _self._element);
    }
  }
}

export {EditableTripPoint as default};
