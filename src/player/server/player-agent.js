import kefir from 'kefir';
import uuid from 'uuid';
import { messages as stateServerMessages } from './state-socket-client';
import initialState from '../common/initial-state';
import gameState from './state';
import '../../common/utils/kefir-extensions';

const idleTimeout = 120000;

export default class PlayerAgent {
  constructor(socket) {
    this.id = uuid.v4();
    this.socket = socket;
    this.lastMessageTime = Date.now();

    this.handleMessagesFromPlayer();
    this.handleMessagesFromStateServer();
    this.sendMessagesToPlayer();
  }

  handleMessagesFromPlayer() {
    const inboundPlayerMessages = kefir
      .fromEvents(this.socket, 'message')
      .map(msg => JSON.parse(msg))
      .onValue(() => this.lastMessageTime = Date.now());

    this.joinRequests = inboundPlayerMessages
      .filter(m => m.type === 'join')
      .map(m => ({
        type: 'join',
        id: this.id,
        name: m.name
      }));

    this.clickRequests = inboundPlayerMessages
      .filter(m => m.type === 'click')
      .map(m => ({
        type: 'click',
        player: this.id
      }));

    this.leaveRequests = kefir
      .merge([
        kefir.fromEvents(this.socket, 'close'),
        kefir.fromEvents(this.socket, 'error')
      ])
      .map(() => ({
        type: 'leave',
        player: this.id
      }));

    stateServerMessages.outbound.plug(this.joinRequests);
    stateServerMessages.outbound.plug(this.clickRequests);
    stateServerMessages.outbound.plug(this.leaveRequests);
  }

  handleMessagesFromStateServer() {
    this.playerState = gameState
      .throttle(100)
      .map(state => {
        const player = state.players[this.id] || null;
        return {
          type: 'state',
          state: {
            id: this.id,
            name: player && player.name,
            team: player && player.team,
            gameStatus: state.status,
            countdown: state.countdown,
            teams: state.teams,
            topPlayer: state.topPlayer
          }
        }
      });
  }

  sendMessagesToPlayer() {
    this.playerOutboundMessageHandler = msg => {
      msg.timestamp = Date.now();
      kefir
        .fromNodeCallback(cb => {
          if (this.socket.readyState !== 1 || Date.now() - this.lastMessageTime > idleTimeout) {
            this.socket.close();
          } else {
            this.socket.send(JSON.stringify(msg), cb);
          }
        })
        .onError(err => this.socket.close())
    };

    this.playerState.onValue(this.playerOutboundMessageHandler);
  }

  dispose() {
    stateServerMessages.outbound.unplug(this.joinRequests);
    stateServerMessages.outbound.unplug(this.clickRequests);
    stateServerMessages.outbound.unplug(this.leaveRequests);
    this.playerState.offValue(this.playerOutboundMessageHandler);
  }
}
