import Trip from './trip';
import {TimeStamp, createElement} from './utils';

class TripInfo {
  constructor(trip) {
    let _element = null;

    if (!(trip instanceof Trip)) {
      throw new TypeError(`Incoming parameter is wrong`);
    }
    if (trip.points.length === 0) {
      throw new TypeError(`Trip doesn't have points`);
    }

    this.pointCount = trip.points.length;
    this.startPoint = trip.points[0];
    this.finishPoint = trip.points[trip.points.length - 1];

    this.getPoint = function (index) {
      if (index < 0 || index >= trip.points.length) {
        throw new TypeError(`Incoming parameter is wrong`);
      }

      return trip.points[index];
    };

    this.removeElelment = function () {
      _element = null;
    };

    this.getElement = function () {
      return _element ? _element : (_element = createElement(this.getTemplate()).firstChild);
    };

    this.getTemplate = function () {
      return `<div class="trip-info__main">
      <h1 class="trip-info__title">${this.startPoint.destination.getName() + ` - ` + (this.pointCount > 3 ? `... - ` : ``) + this.finishPoint.destination.getName()
}</h1>
      <p class="trip-info__dates">${TimeStamp.toLocaleDateString(this.startPoint.startDt)} - ${TimeStamp.toLocaleDateString(this.finishPoint.finishDt)}</p>
    </div>`;
    };

    this.getTotalPrice = function () {
      let totalPrice = 0;

      for (let point of trip.points) {
        totalPrice += point.price;

        if (point.offers !== null && point.offers.size > 0) {
          for (let offer of point.offers) {
            totalPrice += offer.getPrice();
          }
        }
      }

      return totalPrice;
    };
  }
}

export {TripInfo as default};
