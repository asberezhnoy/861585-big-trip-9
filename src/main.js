import Filter from './components/filter';
import Menu from './components/menu';
import TripInfo from './components/trip-info';
import TripSorter from './components/trip-sorter';
import FirstTripPoint from './components/trip-firstpoint';
import {getMockTrip} from './components/datasource';

const Position = {
  BeforeBegin: `beforebegin`,
  AfterBegin: `afterbegin`,
  BeforeEnd: `beforeend`,
  AfterEnd: `afterend`
};

const render = (container, template, position) => {
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
};

const filter = new Filter();
const menu = new Menu();
const trip = getMockTrip();

render(document.querySelector(`.trip-main__trip-controls`), menu.getElement(), Position.AfterBegin);
render(document.querySelector(`.trip-main__trip-controls`), filter.getElement(), Position.BeforeEnd);

if (trip.points.length > 0) {
  const tripInfo = new TripInfo(trip);
  const tripSorter = new TripSorter();

  render(document.querySelector(`.trip-events`), tripSorter.getElement(), Position.BeforeEnd);
  render(document.querySelector(`.trip-main__trip-info`), tripInfo.getElement(), Position.AfterBegin);
  render(document.querySelector(`.trip-events`), trip.getElement(), Position.BeforeEnd);

  document.querySelector(`.trip-info__cost-value`).textContent = tripInfo.getTotalPrice();
} else {
  const firstPoint = new FirstTripPoint();
  render(document.querySelector(`.trip-events`), firstPoint.getElement(), Position.BeforeEnd);
}
