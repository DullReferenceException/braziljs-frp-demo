import kefir from 'kefir';
import transform from '../../../../utils/transform';
import { connections, disconnections, inboundMessages, outboundMessages } from '../events';

class Client {
  constructor(socket) {

    this._myInboundMessages = kefir
      .fromEvents(socket, 'message')
      .map(msg => ({
        client: this,
        message: JSON.parse(msg)
      }));

    this._myOutboundMessages = outboundMessages
      .filter(evt => !evt.client || evt.client === this);

    this._myDisconnects = kefir
      .fromEvents(socket, 'close')
      .map(() => this);

    this._handleServerMessages = evt => socket.send(JSON.stringify(evt.message));

    this._myDisconnects.plugInto(disconnections);
    this._myInboundMessages.plugInto(inboundMessages);
    this._myOutboundMessages.onValue(this._handleServerMessages);
  }

  dispose() {
    this._myDisconnects.unplugFrom(disconnections);
    this._myInboundMessages.unplugFrom(inboundMessages);
    this._myOutboundMessages.offValue(this._handleServerMessages);
  }
}

connections
  .log('Got connection')
  .onValue(socket => new Client(socket));

disconnections
  .log('Got disconnection')
  .onValue(client => client.dispose());
