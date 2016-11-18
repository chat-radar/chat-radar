require('dotenv').config({ silent: true });

module.exports = {

  'logger console level': process.env['LOG_LEVEL'] || (process.env['NODE_ENV'] === 'production' ? 'info' : 'debug'),

  'web port': process.env['WEB_PORT'] ? parseInt(process.env['WEB_PORT']) : 1337,

  'parse databaseURI': process.env['PARSE_MONGODB'] || 'mongodb://localhost:27017/chatradar',
  'parse appId': 'chatradar',
  'parse masterKey': process.env['PARSE_MASTER_KEY'],
  'parse serverURL': process.env['PARSE_SERVER_URL'] || 'http://localhost:1337/api',

}
