import webServer from './web-server';
import createSocketServer from '../../common/utils/web-socket-server';

export default createSocketServer(webServer);
