import kefir from 'kefir';

export default function EventHandler() {
  let theEmitter = null;
  const theStream = kefir.stream(emitter => { theEmitter = emitter; });

  let theCallback = (e) => { theEmitter && theEmitter.emit(e); };
  theCallback.stream = () => theStream;
  return theCallback;
}
