import {TimeStamp} from './utils';
import {AvaliableDestinationPoints} from './common';
import AbstractComponent from './AbstractComponent';

class FirstTripPoint extends AbstractComponent {
  constructor(type, destination) {
    super();

    this.destination = destination;
    this.startDt = null;
    this.finishDt = null;
    this.price = 0;
    this.offers = new Set();

    this.getType = function () {
      return type;
    };

    this.getTemplate = function () {
      return `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            ${this.getEvevntTypeGroup(`Transfer`, [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`])}
            ${this.getEvevntTypeGroup(`Activity`, [`Check-in`, `Sightseeing`, `Restaurant`])}
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            Sightseeing at
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" list="destination-list-1">
          <datalist id="destination-list-1">
            ${AvaliableDestinationPoints.map((item) => {
    return `<option value="${item}"></option>`;
  }).join(``)}
          </datalist>
        </div>

        ${this.getDateTemplate()}

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
    </form>`;
    };
  }

  getDateTemplate() {
    const dt = new Date();
    const startDt = dt.getTime();
    dt.setDate(dt.getDate() + 1);
    const finishDt = dt.getTime();

    return `<div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">
      From
    </label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${TimeStamp.toLocaleString(startDt)}">
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">
      To
    </label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${TimeStamp.toLocaleString(finishDt)}">
  </div>`;
  }

  getEvevntTypeGroup(name, types) {
    return `<fieldset class="event__type-group">
    <legend class="visually-hidden">${name}</legend>
    ${types.map((type) => {
    return this.getEvventTypeTemplate(type);
  }).join(``)}
  </fieldset>`;
  }

  getEvventTypeTemplate(name) {
    const typeName = name.toLowerCase();
    return `<div class="event__type-item">
    <input id="event-type-${typeName}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeName}">
    <label class="event__type-label  event__type-label--${typeName}" for="event-type-${typeName}-1">${typeName}</label>
  </div>`;
  }
}

export {FirstTripPoint as default};
