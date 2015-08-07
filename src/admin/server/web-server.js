import http from 'http';
import path from 'path';
import kefir from 'kefir';
import express from 'express';

const app = express();
app.get('/', (req, res, next) => res.sendFile(path.resolve(__dirname, '../client/static/index.html')));
app.use(express.static(path.resolve(__dirname, '../client/static')));

const server = http.createServer(app);

const listenerStarted = kefir
  .fromNodeCallback(cb => server.listen(8081, cb))
  .map(() => server);

export default listenerStarted;
