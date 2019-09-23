class TimeStamp {
  static toLocaleString(value) {
    return new Date(value).toLocaleString(`ru-RU`, {year: `2-digit`, day: `2-digit`, month: `2-digit`, hour: `2-digit`, minute: `2-digit`});
  }

  static toLocaleDateString(value) {
    return new Date(value).toLocaleDateString(`ru-RU`, {day: `2-digit`, month: `2-digit`});
  }

  static toLocaleTimeString(value) {
    return new Date(value).toLocaleTimeString(`ru-RU`, {hour: `2-digit`, minute: `2-digit`});
  }
}

export {TimeStamp};
