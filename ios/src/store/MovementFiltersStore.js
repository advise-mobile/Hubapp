export default class FilterStore {
  static _instance: FilterStore;

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

  applied: boolean = false;

  publication: boolean;

  ongoing: boolean;

  folderType: number;

  font: number;

  tribunal: [];

  journals: [];

  keywords: [];

  situation: {};

  disponibilityDate: {
    initialDate: string,
    finalDate: string,
  };

  apply() {
    this.applied = true;
  }

  folderTypeApply(folderType) {
    this.folderType = folderType;
  }

  markPublication() {
    this.applied = false;

    if (this.publication) {
      this.publication = false;
      FilterStore._publishChanges();

      return;
    }

    this.publication = true;
    this.ongoing = false;

    FilterStore._publishChanges();
  }

  markOngoing() {
    this.applied = false;
    if (this.ongoing) {
      this.ongoing = false;
      FilterStore._publishChanges();

      return;
    }

    this.ongoing = true;
    this.publication = false;

    FilterStore._publishChanges();
  }

  setFont(font) {
    this.font = font;
    this.applied = false;
    FilterStore._publishChanges();
  }

  setTribunal(tribunal) {
    this.tribunal = tribunal;
    this.applied = false;
    FilterStore._publishChanges();
  }

  setJournals(journals) {
    this.journals = journals;
    this.applied = false;
    FilterStore._publishChanges();
  }

  setKeywords(keywords) {
    this.keywords = keywords;
    this.applied = false;
    FilterStore._publishChanges();
  }

  setDisponibilityDate(disponibilityDate) {
    this.disponibilityDate = disponibilityDate;
    this.applied = false;
    FilterStore._publishChanges();
  }

  setSituation(situation) {
    this.situation = situation;
    this.applied = false;
    FilterStore._publishChanges();
  }
}
