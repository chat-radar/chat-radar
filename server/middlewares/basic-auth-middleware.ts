import app = require('../../lib/application');
const basicAuth = require('basic-auth-connect');

const basicAuthMiddleware = basicAuth(app.get('auth username'), app.get('auth password'));

export default basicAuthMiddleware;
