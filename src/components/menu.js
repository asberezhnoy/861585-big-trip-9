function MenuItem(text, isActive = false) {
  this.getText = function () {
    return text;
  };

  this.isActive = function () {
    return isActive;
  };
}

function Menu(items) {
  this.items = items;
}

const createMenuTemplate = (menu) => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
  ${menu.items.map((item) => `<a class="trip-tabs__btn  ${item.isActive() ? `trip-tabs__btn--active` : ``} " href="#">${item.getText()}</a>`).join(``)}
  </nav>`;
};

export {Menu as default, MenuItem, createMenuTemplate};
