import kefir from 'kefir';

export const statusEventPool = kefir.pool();
export default statusEventPool.toProperty(() => ({ status: 'stopped' }));
