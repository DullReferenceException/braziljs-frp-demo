import kefir from 'kefir';

export const connections = kefir.pool();
export const disconnections = kefir.pool();

export const inboundMessages = kefir.pool();
export const outboundMessages = kefir.pool();

export const joinRequests = inboundMessages
  .filter(e => e.message.type === 'join');

export const addedPlayers = kefir.pool();
export const removedPlayers = kefir.pool();

export const teamJoinings = kefir.pool();
export const teamLeavings = kefir.pool();

export const gameStarts = inboundMessages
  .filter(e => e.message.type === 'start')
  .map(e => e.message);
export const gameStops = kefir.pool();

export const clicks = kefir.pool();
