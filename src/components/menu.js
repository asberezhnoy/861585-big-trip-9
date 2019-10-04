import AbstractComponent from './AbstractComponent';

class MenuItem extends AbstractComponent {
  constructor(title, active = false) {
    super();

    this.setActive = function (value) {
      if (typeof (value) !== `boolean`) {
        throw new TypeError(`Incoming parameter has invalid tyoe`);
      }

      const element = this.getElement();
      element.classList.toggle(`trip-tabs__btn--active`, value);
    };

    this.getTemplate = function () {
      return `<a class="trip-tabs__btn  ${active ? `trip-tabs__btn--active` : ``} " href="#">${title}</a>`;
    };
  }
}

class Menu extends AbstractComponent {
  constructor() {
    super();

    const _items = [
      new MenuItem(`Table`, true),
      new MenuItem(`Stats`)];

    this.getTemplate = function () {
      return `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${_items.map((item) => item.getTemplate()).join(``)}
      </nav>`;
    };
  }
}

export {Menu as default};
