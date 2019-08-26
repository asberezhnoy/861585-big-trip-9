const TripPointTypes = new Set([`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check`, `Sightseeing`, `Restaurant`]);

const AvailableOffers = new Set([
  new Offer(`Order Uber`, 20),
  new Offer(`Add luggage`, 50),
  new Offer(`Switch to comfort`, 80),
  new Offer(`Rent a car`, 200),
  new Offer(`Add breakfast`, 50),
  new Offer(`Book tickets`, 40),
  new Offer(`Lunch in city`, 30)]);

function Offer(title, price) {
  this.getTitle = () => title;
  this.getPrice = () => price;
}

function TripPoint() {
  this.type = null;
  this.title = ``;
  this.startDt = null;
  this.finishDt = null;
  this.price = 0;
  this.offers = new Set();
}

function Trip() {
  this.points = [];
}

const createTripTemplate = (trip) => {
  if (!(trip instanceof Trip)) {
    throw new TypeError(`Неверный тип входного параметра`);
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
  const dt = new Date(points[0].startDt);

  return `
  <li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${dayNumber}</span>
      <time class="day__date" datetime="${dt.toLocaleDateString()}">${dt.toLocaleDateString()}</time>
    </div>
    <ul class="trip-events__list">${points.map((point) => createPointTemplate(point)).join(``)}</ul>
  </li>`;
};

const createPointTemplate = (point) => {
  const startDt = new Date(point.startDt);
  const finishDt = new Date(point.finishDt);

  return `
    <li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${point.title}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startDt.toLocaleString()}">${startDt.toLocaleString()}</time>
            &mdash;
            <time class="event__end-time" datetime="${finishDt.toLocaleString()}">${finishDt.toLocaleString()}</time>
          </p>
          <p class="event__duration">${computeDuration(startDt, finishDt)}</p>
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

const computeDuration = (startDt, finishDt) => {
  const seconds = (finishDt - startDt) / 1000;
  const days = Math.floor(seconds / (60 * 60 * 24));
  const hours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = (seconds - days * (60 * 60 * 24) - hours * (60 * 60)) / 60;

  if (days === 0 && hours === 0) {
    return `${minutes}M`;
  }
  if (days === 0) {
    return `${hours}H ${minutes}M`;
  }
  return `${days}D ${hours}H ${minutes}M`;
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
         <span class="event__offer-title">${offer.getTitle()}</span>
         &plus;
         &euro;&nbsp;<span class="event__offer-price">${offer.getPrice()}</span>
      </li>`;
  }).join(``)}
  </ul>`;
};

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

const createTripInfoTemplate = (trip) => {
  if (!(trip instanceof Trip)) {
    throw new TypeError(`Неверный тип входного параметра`);
  }
  if (trip.points.length === 0) {
    return ``;
  }

  return `<div class="trip-info__main">
  <h1 class="trip-info__title">${trip.points.map((item, index) => {
    if (index === 0) {
      return trip.points[0].title + ` - `;
    }
    if (index === 1) {
      return (trip.points.length > 3 ? `...` : trip.points[1].title) + ` - `;
    }
    return index === trip.points.length - 1 ? trip.points[trip.points.length - 1].title : ``;
  }).join(``)}</h1>
  <p class="trip-info__dates">${new Date(trip.points[0].startDt).toLocaleString()} - ${new Date(trip.points[trip.points.length - 1].finishDt).toLocaleString()}</p>
</div>`;
};

const createTRripSortTemplate = () => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
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

export {Trip as default, TripPoint, TripPointTypes, Offer, AvailableOffers, createTripInfoTemplate, createTRripSortTemplate, createTripTemplate};
