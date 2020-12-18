export default class FilterStore {
  static _instance;

  static _subjects = [];

  static subscribe(subject) {
    FilterStore._subjects.push(subject);
  }

  static _publishChanges() {
    FilterStore._subjects.forEach(subject => subject.forceUpdate());
  }

  static getStore() {
    if (!FilterStore._instance) {
      FilterStore._instance = new FilterStore();
    }
    return FilterStore._instance;
  }

  static clear() {
    FilterStore._instance = new FilterStore();
  }

  applied = false;

  integer;

  year;

  tribunal;

  groups;

  apply() {
    this.applied = true;
  }

  markInteger() {
    this.applied = false;
    this.integer = !this.integer;

    FilterStore._publishChanges();
  }

  setYear(year) {
    this.applied = false;
    this.year = year;

    FilterStore._publishChanges();
  }

  setGroup(groups) {
    this.applied = false;
    this.groups = groups;

    FilterStore._publishChanges();
  }

  setTribunal(tribunal) {
    this.applied = false;
    this.tribunal = tribunal;

    FilterStore._publishChanges();
  }
}
