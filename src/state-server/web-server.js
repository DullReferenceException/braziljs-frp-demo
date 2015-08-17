import path from 'path';
import createWebServer from '../common/utils/simple-web-server';

export default createWebServer({
  workers: 1,
  port: 8081,
  directory: path.resolve(__dirname, '../presentation-client/static')
});
