import {AvailableOffers} from './offer';
import Picture from './picture';
import Destination from './destination';
import TripPoint from './trip-point';
import Trip from './trip';
import {AvailableTripPointTypes, AvailableSentences, AvaliableDestinationPoints} from './common';

const TRIPPOINT_MAXCOUNT = 5;
const TRIPPOINT_DESTINATION_MAXPICTURES = 5;
const TRIPPOINT_OFFERS_MAXCOUNT = 2;

const getMockTrip = () => {
  const trip = new Trip();

  let startDt = Date.now();

  for (let i = 0; i < TRIPPOINT_MAXCOUNT; i++) {
    const point = createTripPoint(startDt);
    trip.points.push(point);

    startDt = point.finishDt + 1;
  }
  return trip;
};

function createTripPoint(startDt) {
  const type = getRandomValueFromArray(AvailableTripPointTypes).toLowerCase();
  const destination = new Destination(getRandomValueFromArray(AvaliableDestinationPoints), getDescription(), getPictures());

  const point = new TripPoint(type, destination);
  point.price = Math.round(Math.random() * 50);
  point.startDt = addRandomIntervalToDate(startDt);
  point.finishDt = addRandomIntervalToDate(point.startDt);
  getOffers().forEach((offer) => point.offers.add(offer));

  return point;
}

function addRandomIntervalToDate(timestamp) {
  return timestamp + (Math.floor(Math.random() * 1000 * 60 * 60 * 24) || 3600000);
}

function getOffers() {
  const offers = [];
  const count = Math.round(Math.random() * TRIPPOINT_OFFERS_MAXCOUNT);

  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * (AvailableOffers.length - 1));
    offers.push(AvailableOffers[index]);
  }

  return offers;
}

function getPictures() {
  const count = Math.floor(Math.random() * TRIPPOINT_DESTINATION_MAXPICTURES) || 1;
  const pictures = [];

  for (let i = 0; i < count; i++) {
    pictures.push(new Picture(`http://picsum.photos/300/150?r=${Math.random()}`));
  }

  return pictures;
}

function getDescription() {
  let description = ``;
  const count = Math.round(Math.random() * 3) || 1;

  for (let i = 0; i < count; i++) {
    description += AvailableSentences[Math.round(Math.random() * AvailableSentences.length)];
  }

  return description;
}

function getRandomValueFromArray(array) {
  if (array.length === 0) {
    throw new TypeError(`Array is empty`);
  }

  const offset = Math.floor(Math.random() * (array.length - 1));
  return array[offset];
}

export {getMockTrip};

