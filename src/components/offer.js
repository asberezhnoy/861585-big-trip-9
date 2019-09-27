import {createElement} from "./utils";

class Offer {
  constructor(name, title, price) {
    let _element = null;

    this.getName = function () {
      return name;
    };

    this.getTitle = function () {
      return title;
    };

    this.getPrice = function () {
      return price;
    };

    this.getElement = function () {
      return _element ? _element : (_element = createElement(this.getTemplate()).firstChild);
    };

    this.getTemplate = function () {
      return `<li class="event__offer">
      <span class="event__offer-title">${this.getTitle()}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${this.getPrice()}</span>
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
