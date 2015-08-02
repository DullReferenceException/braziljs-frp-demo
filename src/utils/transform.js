import kefir from 'kefir';

export default function transform(initValue, ...args) {
  let value = initValue;
  let streams = [];
  while (args.length) {
    let [source, calculateNewValue, ...newArgs] = args;
    streams.push(source.map(v => value = calculateNewValue(value, v)));
    args = newArgs;
  }

  return kefir.merge(streams).toProperty(() => value);
}
