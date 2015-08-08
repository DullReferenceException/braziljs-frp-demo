import path from 'path';
import webServer from '../../common/utils/simple-web-server';

export default webServer({
  workers: 4,
  port: 8080,
  directory: path.resolve(__dirname, '../client/static')
});
