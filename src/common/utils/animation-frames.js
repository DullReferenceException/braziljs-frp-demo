import kefir from 'kefir';

export default kefir.repeat(() => kefir.fromCallback(cb => requestAnimationFrame(cb)));
