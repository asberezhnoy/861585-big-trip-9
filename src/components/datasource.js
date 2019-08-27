import Trip, {TripPoint, TripPointTypes, AvailableOffers} from './trip';

const getMockTrip = () => {
  const trip = new Trip();

  let startDt = Date.now();
  const offers = Array.from(AvailableOffers);

  for (let i = 0; i < 3; i++) {
    const point = new TripPoint();
    point.type = Array.from(TripPointTypes)[TripPointTypes.size - Math.round(Math.random() * TripPointTypes.size)];
    point.title = `point ${i + 1}`;
    point.price = Math.round(Math.random() * 50);
    point.startDt = startDt + (Math.round(Math.random() * 3) * 24 + Math.floor(Math.random() * 24)) * 60 * 50 * 1000;
    point.finishDt = point.startDt + (Math.round(Math.random() * 3) * 24 + Math.floor(Math.random() * 24)) * 60 * 50 * 1000;
    for (let j = 0; j < Math.floor(Math.random() * offers.length); j++) {
      point.offers.add(offers[j]);
    }
    trip.points.push(point);

    startDt = point.finishDt + 1;
  }
  return trip;
};

export {getMockTrip};

