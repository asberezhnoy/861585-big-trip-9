import Filter from './filter';
import Menu from './menu';
import TripInfo from './trip-info';
import TripSorter from './trip-sorter';
import FirstTripPoint from './trip-firstpoint';

const Position = {
  BeforeBegin: `beforebegin`,
  AfterBegin: `afterbegin`,
  BeforeEnd: `beforeend`,
  AfterEnd: `afterend`
};

class TripController {
  constructor(appContainer, trip) {
    this.init = function () {
      const filter = new Filter();
      const menu = new Menu();

      render(appContainer.querySelector(`.trip-main__trip-controls`), menu.getElement(), Position.AfterBegin);
      render(appContainer.querySelector(`.trip-main__trip-controls`), filter.getElement(), Position.BeforeEnd);

      if (trip.points.length > 0) {
        const tripInfo = new TripInfo(trip);
        const tripSorter = new TripSorter();

        render(appContainer.querySelector(`.trip-events`), tripSorter.getElement(), Position.BeforeEnd);
        render(appContainer.querySelector(`.trip-main__trip-info`), tripInfo.getElement(), Position.AfterBegin);
        render(appContainer.querySelector(`.trip-events`), trip.getElement(), Position.BeforeEnd);

        appContainer.querySelector(`.trip-info__cost-value`).textContent = tripInfo.getTotalPrice();
      } else {
        const firstPoint = new FirstTripPoint();
        render(appContainer.querySelector(`.trip-events`), firstPoint.getElement(), Position.BeforeEnd);
      }
    };

    function render(container, template, position) {
      if (typeof (template) === `string`) {
        container.insertAdjacentHTML(position, template);
        return;
      }

      if (position === Position.AfterBegin) {
        container.prepend(template);
      } else if (position === Position.BeforeBegin) {
        container.before(template);
      } else if (position === Position.AfterEnd) {
        container.after(template);
      } else if (position === Position.BeforeEnd) {
        container.append(template);
      }
    }
  }
}

export {TripController as default};
