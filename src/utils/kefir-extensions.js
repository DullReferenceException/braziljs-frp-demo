import kefir from 'kefir';

kefir.Observable.prototype.combineLatest = function (other, combinator) {
  return kefir.combine([this], [other], combinator);
};

kefir.Observable.prototype.plugInto = function (pool) {
  pool.plug(this);
  return this;
};


kefir.Observable.prototype.unplugFrom = function (pool) {
  pool.unplug(this);
  return this;
};
