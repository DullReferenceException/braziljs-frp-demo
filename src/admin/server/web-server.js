import path from 'path';
import webServer from '../../utils/simple-web-server';

export default webServer({
  workers: 1,
  port: 8081,
  directory: path.resolve(__dirname, '../client/static')
});
