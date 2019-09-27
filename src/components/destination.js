class Destination {
  constructor(name, description, pictures) {
    this.getName = function () {
      return name;
    };

    this.getDescription = function () {
      return description;
    };

    this.getPictures = function () {
      return pictures;
    };
  }
}

export {Destination as default};
