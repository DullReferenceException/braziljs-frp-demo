import http from 'http';
import path from 'path';
import kefir from 'kefir';
import express from 'express';
import sticky from 'sticky-session';

export default function simpleWebServer({ workers, port, directory }) {
  const app = express();
  app.get('/', (req, res, next) => res.sendFile(path.resolve(directory, 'index.html')));
  app.use(express.static(directory));

  const server = http.createServer(app);
  const listener = workers == 1 ? server : sticky(workers, server);

  return kefir
    .fromNodeCallback(cb => listener.listen(port, cb))
    .map(() => server);
}
