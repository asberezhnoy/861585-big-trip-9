import {Offer} from './trip';

const AvailableTripPointTypes = Array.from(new Set([`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check`, `Sightseeing`, `Restaurant`]));

Offer.Type = {
  Luggage: `luggage`,
  Comfort: `comfort`,
  Meal: `meal`,
  Seats: `seats`
};

const AvailableOffers = Array.from(new Set([
  new Offer(Offer.Type.Luggage, `Add luggage`, 10),
  new Offer(Offer.Type.Comfort, `Switch to comfort class`, 150),
  new Offer(Offer.Type.Meal, `Add meal`, 2),
  new Offer(Offer.Type.Seats, `Choose seats`, 9)
]));

const AvailableSentences = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`.split(`.`);
const AvaliableDestinationPoints = Array.from(new Set([`London`, `Paris`, `Rome`, `Barcelona`, `Berlin`, `Geneva`, `Munich`]));

export {AvailableTripPointTypes, AvailableOffers, AvailableSentences, AvaliableDestinationPoints};
