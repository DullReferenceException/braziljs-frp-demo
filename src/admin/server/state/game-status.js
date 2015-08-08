import kefir from 'kefir';
import starts from '../messages/inbound/starts';

const timerConfigs = starts
  .map(e => ({
    countdown: e.countdown || 5,
    duration: e.duration || 30,
    delay: e.delay || 30
  }))
  .toProperty();

function timerEvent(trigger, newStatus, duration) {
  return kefir
    .combine([trigger], [timerConfigs])
    .flatMap(([prevEvent, cfg]) => kefir.later(
      (prevEvent.countdown || 0) * 1000,
      {
        status: newStatus,
        countdown: cfg[duration]
      }));
}

const startingEvents = kefir.pool();

const firstStartEvents = timerEvent(timerConfigs, 'starting', 'countdown');
const startedEvents = timerEvent(startingEvents, 'started', 'duration');
const waitingEvents = timerEvent(startedEvents, 'waiting', 'delay');
const restartingEvents = timerEvent(waitingEvents, 'starting', 'countdown');

startingEvents.plug(firstStartEvents);
startingEvents.plug(restartingEvents);

export default kefir
  .merge([
    startingEvents,
    startedEvents,
    waitingEvents,
    restartingEvents
  ])
  .toProperty(() => ({ status: 'stopped' }));
