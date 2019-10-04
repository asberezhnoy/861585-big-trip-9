import AbstractComponent from './AbstractComponent';

class FilterItem extends AbstractComponent {
  constructor(name, title, checked = false) {
    super();

    this.setChecked = function (value) {
      if (typeof (value) !== `boolean`) {
        throw new TypeError(`Incoming parameter has invalid tyoe`);
      }

      const element = this.getElement().querySelector(`input`);

      if (value === false) {
        element.removeAttribute(`checked`);
      } else if (value === true) {
        element.setAttribute(`checked`, null);
      }
    };

    this.getTemplate = function () {
      return `<div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${checked ? `checked` : ``} >
      <label class="trip-filters__filter-label" for="filter-${name}">${title}</label>
      </div>`;
    };
  }
}

class Filter extends AbstractComponent {
  constructor() {
    super();

    const _items = [
      new FilterItem(`everything`, `Everything`, true),
      new FilterItem(`future`, `Future`),
      new FilterItem(`past`, `Past`)];

    this.getTemplate = function () {
      return `<form class="trip-filters" action="#" method="get">
      ${_items.map((item) => item.getTemplate()).join(``)}
      <button class="visually-hidden" type="submit">Accept filter</button></form>`;
    };
  }
}

export {Filter as default};
