import {createElement} from './utils';

class AbstractComponent {
  constructor() {
    this. _element = null;

    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }
  }

  removeElelment() {
    this._element = null;
  }

  getElement() {
    return this._element ? this._element : (this._element = createElement(this.getTemplate()).firstChild);
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }
}

export {AbstractComponent as default};
