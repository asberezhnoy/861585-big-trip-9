import {createElement} from './utils';

class FilterItem {
  constructor(name, title) {
    let _checked = false;
    let _element = null;

    this.getName = function () {
      return name;
    };

    this.getTitle = function () {
      return title;
    };

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

      _checked = value;
    };

    this.isChecked = function () {
      return _checked;
    };

    this.getElement = function () {
      return _element || (_element = createElement(this.getTemplate()).firstChild);
    };

    this.removeElelement = function () {
      _element = null;
    };

    this.getTemplate = function () {
      return `<div class="trip-filters__filter">
      <input id="filter-${this.getName()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${this.getName()}" ${this.isChecked() ? `checked` : ``} >
      <label class="trip-filters__filter-label" for="filter-${this.getName()}">${this.getTitle()}</label>
      </div>`;
    };
  }
}

class Filter {
  constructor() {
    let _element = null;
    const _items = [
      new FilterItem(`everything`, `Everything`, true),
      new FilterItem(`future`, `Future`),
      new FilterItem(`past`, `Past`)];

    _items[0].setChecked(true);

    this.getTemplate = function () {
      return _items.map((item) => item.getTemplate()).join(``);
    };

    this.getElement = function () {
      if (_element === null) {
        _element = createElement(`<form class="trip-filters" action="#" method="get"></form>`).firstChild;

        _items.map((item) => _element.append(item.getElement()));
        _element.append(createElement(`<button class="visually-hidden" type="submit">Accept filter</button>`));
      }
      return _element;
    };

    this.removeElelement = function () {
      _element = null;
    };
  }
}

export {Filter as default};
