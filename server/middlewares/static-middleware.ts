import Express = require('express');
import path = require('path');

const staticMiddleware = Express.static(path.join(__dirname, '..', '..', 'public'), {
  maxAge: '30d',
  setHeaders: (res: Express.Response, path: string) => {
    if (Express.static.mime.lookup(path) === 'text/html') {
      res.setHeader('Cache-Control', 'public, max-age=0');
    }
  }
});

export default staticMiddleware;
