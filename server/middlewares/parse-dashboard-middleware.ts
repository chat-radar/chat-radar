import app = require('../../lib/application');
const ParseDashboard = require('parse-dashboard');

const parseDashboardMiddleware = new ParseDashboard({
  apps: [
    {
      serverURL: app.get('parse serverURL'),
      appId: app.get('parse appId'),
      appName: app.get('parse appName'),
      masterKey: app.get('parse masterKey'),
    }
  ]
});

export = parseDashboardMiddleware;
