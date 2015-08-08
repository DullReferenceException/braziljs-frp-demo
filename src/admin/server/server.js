import path from 'path';
import kefir from 'kefir';
import createWebServer from '../../common/utils/simple-web-server';
import createSocketServer from '../../common/utils/web-socket-server';

const webServer = createWebServer(
  {
    workers: 1,
    port: 8081,
    directory: path.resolve(__dirname, '../client/static')
  })
  .onValue(() => console.log('Admin interface listening at http://localhost:8081/'));

export default createSocketServer(webServer);
