import { Observable, BehaviorSubject } from 'rx';
import events from '../events';

class Client {
  constructor(socket) {
    Observable
      .fromEvent(socket, 'message')
      .map(msg => {
        msg = JSON.parse(msg);
        return {
          client: this,
          type: msg.type,
          message: msg
        }
      })
      .subscribe(msg => events.emit('client.' + msg.type, msg.message));

    Observable
      .fromEvent(socket, 'close')
      .map(evt => {
        return { client: this };
      })
      .subscribe(events.ofType('client.disconnect'));

    events
      .ofType('server.message')
      .filter(evt => !evt.client || evt.client === this)
      .forEach(evt => socket.send(evt.message));
  }
}

const clients = new BehaviorSubject([]);

events
  .ofType('client.connect')
  .map(socket => new Client(socket))
  .withLatestFrom(clients, (newClient, allClients) => allClients.concat(newClient))
  .subscribe(clients);

events
  .ofType('client.disconnect')
  .pluck('client')
  .withLatestFrom(clients, (client, allClients) => allClients.filter(c => c !== client))
  .subscribe(clients);

export default clients;
