import app = require('../../lib/application');
const { ParseServer } = require('parse-server');

const parseServerMiddleware = new ParseServer({
  databaseURI: app.get('parse databaseURI'),
  appId: app.get('parse appId'),
  appName: app.get('parse appName'),
  masterKey: app.get('parse masterKey'),
  serverURL: app.get('parse serverURL'),
  loggerAdapter: app.get('logger'),
  liveQuery: {
    classNames: app.get('parse liveQuery classes'),
  },
});

export = parseServerMiddleware;
