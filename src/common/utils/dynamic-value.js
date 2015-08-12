import kefir from 'kefir';

export default function transform(initValue, ...args) {
  let mutations = [];
  while (args.length) {
    let [source, calculateNewValue, ...newArgs] = args;
    mutations.push(source.map(e => ({ event: e, mutation: calculateNewValue })));
    args = newArgs;
  }

  return kefir
    .merge(mutations)
    .scan((prev, { event, mutation }) => mutation(prev, event), initValue);
}
