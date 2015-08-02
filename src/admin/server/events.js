import { Subject } from 'rx';

class EventSource {
  constructor() {
    this._subjects = {};
  }

  ofType(type) {
    return this._getSubject(type);
  }

  emit(type, payload) {
    this._getSubject(type).onNext(payload);
  }

  _getSubject(type) {
    return this._subjects[type] || (this._subjects[type] = new Subject())
  }
}

export default new EventSource();
