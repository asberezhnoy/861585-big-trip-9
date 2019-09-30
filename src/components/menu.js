import {createElement} from './utils';

class MenuItem {
  constructor(title) {
    let _active = false;
    let _element = null;

    this.getTitle = function () {
      return title;
    };

    this.setActive = function (value) {
      if (typeof (value) !== `boolean`) {
        throw new TypeError(`Incoming parameter has invalid tyoe`);
      }

      const element = this.getElement();
      element.classList.toggle(`trip-tabs__btn--active`, value);

      _active = value;
    };

    this.isActive = function () {
      return _active;
    };

    this.getElement = function () {
      return _element || (_element = createElement(this.getTemplate()).firstChild);
    };

    this.removeElelement = function () {
      _element = null;
    };

    this.getTemplate = function () {
      return `<a class="trip-tabs__btn  ${this.isActive() ? `trip-tabs__btn--active` : ``} " href="#">${this.getTitle()}</a>`;
    };
  }
}

class Menu {
  constructor() {
    let _element = null;
    const _items = [
      new MenuItem(`Table`),
      new MenuItem(`Stats`)];

    _items[0].setActive(true);

    this.getTemplate = function () {
      return _items.map((item) => item.getTemplate()).join(``);
    };

    this.getElement = function () {
      if (_element === null) {
        _element = createElement(`<nav class="trip-controls__trip-tabs  trip-tabs"/>`).firstChild;

        _items.map((item) => _element.append(item.getElement()));
      }
      return _element;
    };

    this.removeElelement = function () {
      _element = null;
    };
  }
}

export {Menu as default};
