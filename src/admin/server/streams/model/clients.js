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
      .filter(evt => !evt.client || evt.client === this)
      .flatMap(evt => kefir.fromNodeCallback(cb => socket.send(JSON.stringify(evt.message), cb)))
      .skipValues();

    this._myDisconnects = kefir
      .merge([
        kefir.fromEvents(socket, 'close'),
        this._myOutboundMessages.errorsToValues()
      ])
      .map(() => this);

    this._myDisconnects.plugInto(disconnections);
    this._myInboundMessages.plugInto(inboundMessages);
  }

  dispose() {
    this._myDisconnects.unplugFrom(disconnections);
    this._myInboundMessages.unplugFrom(inboundMessages);
  }
}

connections.onValue(socket => new Client(socket));
disconnections.onValue(client => client.dispose());
