import {createFilterTemplate} from './components/filter';
import {createMenuTemplate} from './components/menu';
import {createTripInfoTemplate, createTRripSortTemplate, createTripTemplate} from './components/trip';
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

render(document.querySelector(`.trip-main__trip-info`), createTripInfoTemplate(trip), Position.Afterbegin);
render(document.querySelector(`.trip-main__trip-controls`), createMenuTemplate(), Position.Afterbegin);
render(document.querySelector(`.trip-main__trip-controls`), createFilterTemplate(), Position.Beforeend);
render(document.querySelector(`.trip-events`), createTRripSortTemplate(), Position.Beforeend);
render(document.querySelector(`.trip-events`), createTripTemplate(trip), Position.Beforeend);
