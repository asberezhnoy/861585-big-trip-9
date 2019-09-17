import {TimeStamp} from './utils';
import {AvailableOffers} from './common';

function Offer(type, title, price) {
  this.type = type;
  this.title = title;
  this.price = price;
}

function Picture(src) {
  this.getSrc = function () {
    return src;
  };
}

function Destination(name, description, pictures) {
  this.name = name;
  this.description = description;
  this.pictures = pictures;
}

function TripPoint(type, destination) {
  this.destination = destination;
  this.startDt = null;
  this.finishDt = null;
  this.price = 0;
  this.offers = new Set();

  this.getType = function () {
    return type;
  };
}

function Trip() {
  this.points = [];
}

function TripInfo(trip) {
  if (!(trip instanceof Trip)) {
    throw new TypeError(`Incoming parameter is wrong`);
  }
  if (trip.points.length === 0) {
    throw new TypeError(`Trip doesn't have points`);
  }

  this.pointCount = trip.points.length;
  this.startPoint = trip.points[0];
  this.finishPoint = trip.points[trip.points.length - 1];
  this.totalPrice = getTotalPrice();

  this.getPoint = function (index) {
    if (index < 0 || index >= trip.points.length) {
      throw new TypeError(`Incoming parameter is wrong`);
    }

    return trip.points[index];
  };

  function getTotalPrice() {
    let totalPrice = 0;

    for (let point of trip.points) {
      totalPrice += point.price;

      if (point.offers !== null && point.offers.size > 0) {
        for (let offer of point.offers) {
          totalPrice += offer.price;
        }
      }
    }

    return totalPrice;
  }
}

const createTripTemplate = (trip) => {
  if (!(trip instanceof Trip)) {
    throw new TypeError(`Incoming parameter has invalid type`);
  }
  if (trip.points.length === 0) {
    return ``;
  }

  const groups = groupTripPointsByDay(trip.points);
  return `<ul class="trip-days">${groups.map((points, index) => {
    return createDayTemplate(index + 1, points);
  }).join(``)}></ul>`;
};

const createDayTemplate = (dayNumber, points) => {
  return `
  <li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${dayNumber}</span>
      <time class="day__date" datetime="${TimeStamp.toLocaleDateString(points[0].startDt)}">${TimeStamp.toLocaleDateString(points[0].startDt)}</time>
    </div>
    <ul class="trip-events__list">${points.map((point, index) => {
    return dayNumber === 1 && index === 0 ? createPointEditTemplate(point) : createPointTemplate(point);
  }).join(``)}</ul>
  </li>`;
};

const createPointEditTemplate = (point) => {
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
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${point.destination.name}" list="destination-list-1">
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
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.type}-1" type="checkbox" name="event-offer-${offer.type}" ${Array.from(point.offers).some((element) => element.title === offer.title) ? `checked` : ``}>
            <label class="event__offer-label" for="event-offer-${offer.name}-1">
              <span class="event__offer-title">${offer.title}</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
            </label>
          </div>`;
  }).join(``)}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${point.destination.description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${Array.from(point.destination.pictures).map((picture) => {
    return `<img class="event__photo" src="${picture.getSrc()}" alt="Event photo">`;
  }).join(``)}
          </div>
        </div>
      </section>
    </section>
  </form>
</li>`;
};

const createPointTemplate = (point) => {
  return `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${point.getType()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${point.destination.name}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${TimeStamp.toLocaleTimeString(point.startDt)}">${TimeStamp.toLocaleTimeString(point.startDt)}</time>
            &mdash;
            <time class="event__end-time" datetime="${TimeStamp.toLocaleTimeString(point.finishDt)}">${TimeStamp.toLocaleTimeString(point.finishDt)}</time>
          </p>
          <p class="event__duration">${computeDuration(point)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${point.price}</span>
        </p>

        ${cretaeOffersTemplate(point.offers)}

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`;
};

const cretaeOffersTemplate = (offers) => {
  if (offers.size === 0) {
    return ``;
  }

  return `
  <h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">${Array.from(offers).map((offer) => {
    return `
      <li class="event__offer">
         <span class="event__offer-title">${offer.title}</span>
         &plus;
         &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
      </li>`;
  }).join(``)}
  </ul>`;
};

const createTripInfoTemplate = (tripInfo) => {
  if (!(tripInfo instanceof TripInfo)) {
    throw new TypeError(`Неверный тип входного параметра`);
  }

  return `<div class="trip-info__main">
  <h1 class="trip-info__title">${tripInfo.startPoint.destination.name + ` - ` + (tripInfo.pointCount > 3 ? `... - ` : ``) + tripInfo.finishPoint.destination.name
}</h1>
  <p class="trip-info__dates">${TimeStamp.toLocaleDateString(tripInfo.startPoint.startDt)} - ${TimeStamp.toLocaleDateString(tripInfo.finishPoint.finishDt)}</p>
</div>`;
};

const createTripSortTemplate = () => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
<span class="trip-sort__item  trip-sort__item--day">Day</span>

<div class="trip-sort__item  trip-sort__item--event">
  <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" checked>
  <label class="trip-sort__btn" for="sort-event">Event</label>
</div>

<div class="trip-sort__item  trip-sort__item--time">
  <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
  <label class="trip-sort__btn" for="sort-time">
    Time
    <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
      <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
    </svg>
  </label>
</div>

<div class="trip-sort__item  trip-sort__item--price">
  <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
  <label class="trip-sort__btn" for="sort-price">
    Price
    <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
      <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
    </svg>
  </label>
</div>

<span class="trip-sort__item  trip-sort__item--offers">Offers</span>
</form>`;

const groupTripPointsByDay = (points) => {
  let days = [];

  let currDay = new Date(points[0].startDt);

  for (let point of points) {
    if (days.length === 0) {
      days[0] = [point];
    } else {
      const startDt = new Date(point.startDt);
      if (startDt.getDate() === currDay.getDate()) {
        days[days.length - 1].push(point);
      } else {
        days.push([point]);
      }
    }
  }

  return days;
};

const computeDuration = (point) => {
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
};

export {Trip as default, TripPoint, TripInfo, Offer, Destination, Picture, createTripInfoTemplate, createTripSortTemplate, createTripTemplate};
