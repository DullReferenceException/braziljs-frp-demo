import Promise from 'bluebird';
import http from 'http';
import path from 'path';
import express from 'express';

export default class WebServer {
  constructor() {
    this.app = express();

    this.app.get('/', (req, res, next) => res.sendFile(path.resolve(__dirname, '../client/static/index.html')));

    this.app.use(express.static(path.resolve(__dirname, '../client/static')));

    this.server = http.createServer(this.app);
  }

  start() {
    return Promise.fromNode(cb => this.server.listen(8081, cb));
  }
}
