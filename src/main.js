import Filter, {createFilterTemplate, FilterItem} from './components/filter';
import Menu, {createMenuTemplate, MenuItem} from './components/menu';
import {TripInfo, createTripInfoTemplate, createTripSortTemplate, createTripTemplate} from './components/trip';
import {getMockTrip} from './components/datasource';

function Position() {}
Position.Beforebegin = `beforebegin`;
Position.Afterbegin = `afterbegin`;
Position.Beforeend = `beforeend`;
Position.afterend = `afterend`;

const render = (container, template, position) => {
  container.insertAdjacentHTML(position, template);
};

const trip = getMockTrip();
const tripInfo = new TripInfo(trip);

render(document.querySelector(`.trip-main__trip-info`), createTripInfoTemplate(tripInfo), Position.Afterbegin);
render(document.querySelector(`.trip-main__trip-controls`), createMenuTemplate(new Menu([
  new MenuItem(`Table`, true),
  new MenuItem(`Stats`)])), Position.Afterbegin);
render(document.querySelector(`.trip-main__trip-controls`), createFilterTemplate(new Filter([
  new FilterItem(`everything`, `Everything`, true),
  new FilterItem(`future`, `Future`),
  new FilterItem(`past`, `Past`)])),
Position.Beforeend);
render(document.querySelector(`.trip-events`), createTripSortTemplate(), Position.Beforeend);
render(document.querySelector(`.trip-events`), createTripTemplate(trip), Position.Beforeend);

document.querySelector(`.trip-info__cost-value`).textContent = tripInfo.totalPrice;
