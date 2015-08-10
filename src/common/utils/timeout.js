import kefir from 'kefir';

export default function timeout(milliseconds) {
  return kefir.fromCallback(cb => setTimeout(cb, milliseconds));
}
