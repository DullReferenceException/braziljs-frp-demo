import http from 'http';
import path from 'path';
import kefir from 'kefir';
import express from 'express';

export default function simpleWebServer({ port, directory }) {

  const app = express();
  app.get('/', (req, res, next) => res.sendFile(path.resolve(directory, 'index.html')));
  app.use(express.static(directory));

  const server = http.createServer(app);

  return kefir
    .fromNodeCallback(cb => server.listen(port, cb))
    .map(() => server);
}
