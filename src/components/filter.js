function FilterItem(id, text, isChecked = false) {
  this.getId = function () {
    return id;
  };

  this.getText = function () {
    return text;
  };

  this.isChecked = function () {
    return isChecked;
  };
}

function Filter(items) {
  this.items = items;
}

const createFilterTemplate = (filter) => `<form class="trip-filters" action="#" method="get">
${filter.items.map((item) => {
    return `<div class="trip-filters__filter">
<input id="filter-${item.getId()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${item.getId()}" ${item.isChecked() ? `checked` : ``} >
<label class="trip-filters__filter-label" for="filter-${item.getId()}">${item.getText()}</label>
</div>`;
  }).join(``)}

<button class="visually-hidden" type="submit">Accept filter</button>
</form>`;

export {createFilterTemplate, FilterItem, Filter as default};
