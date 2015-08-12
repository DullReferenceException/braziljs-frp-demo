import timeout from './timeout';

export default function waitUntil(timestamp) {
  return timeout(timestamp - Date.now());
}
