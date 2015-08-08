import createSocketClient from '../../common/utils/web-socket-client';

export default createSocketClient({ url: 'ws://' + location.host + '/' });
