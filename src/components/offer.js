import AbstractComponent from './AbstractComponent';

class Offer extends AbstractComponent {
  constructor(name, title, price) {
    super();

    this.getName = function () {
      return name;
    };

    this.getTitle = function () {
      return title;
    };

    this.getPrice = function () {
      return price;
    };

    this.getTemplate = function () {
      return `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${price}</span>
   </li>`;
    };
  }
}

Offer.Names = {
  Luggage: `luggage`,
  Comfort: `comfort`,
  Meal: `meal`,
  Seats: `seats`
};

const AvailableOffers = Array.from(new Set([
  new Offer(Offer.Names.Luggage, `Add luggage`, 10),
  new Offer(Offer.Names.Comfort, `Switch to comfort class`, 150),
  new Offer(Offer.Names.Meal, `Add meal`, 2),
  new Offer(Offer.Names.Seats, `Choose seats`, 9)
]));

export {Offer as default, AvailableOffers};
