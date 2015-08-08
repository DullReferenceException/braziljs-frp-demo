import path from 'path';
import createWebServer from '../../common/utils/simple-web-server';

export default createWebServer({
  workers: 4,
  port: 8080,
  directory: path.resolve(__dirname, '../client/static')
});
