import {TimeStamp, createElement} from './utils';

class Trip {
  constructor() {
    this.points = [];
    let _element = null;

    this.getElement = function () {
      if (_element === null) {
        _element = createElement(`<ul class="trip-days"/>`).firstChild;
        const groups = groupTripPointsByDay(this.points);
        groups.forEach((points, index) => {
          _element.append(createDayTemplate(index + 1, points));
        });
      }
      return _element;
    };

    this.getTemplate = function () {
      return this.getElement().outerHTML;
    };

    function createDayTemplate(dayNumber, points) {
      const element = createElement(`<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayNumber}</span>
        <time class="day__date" datetime="${TimeStamp.toLocaleDateString(points[0].startDt)}">${TimeStamp.toLocaleDateString(points[0].startDt)}</time>
      </div>
      <ul class="trip-events__list"/></li>`).firstChild;
      const events = element.querySelector(`.trip-events__list`);
      points.forEach((point) => {
        events.append(point.getElement());
      });
      return element;
    }

    function groupTripPointsByDay(points) {
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
    }
  }
}

export {Trip as default};
