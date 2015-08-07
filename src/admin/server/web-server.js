import path from 'path';
import webServer from '../../utils/simple-web-server';

export default webServer({
  port: 8081,
  directory: path.resolve(__dirname, '../client/static')
});
