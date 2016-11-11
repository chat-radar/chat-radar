/// <reference path='../typings/index.d.ts' />

require('dotenv').config({ silent: true });

export = {

  'web port': process.env['WEB_PORT'] ? parseInt(process.env['WEB_PORT']) : 1337,

  'parse databaseURI': process.env['PARSE_MONGODB'] || 'mongodb://localhost:27017/chatradar',
  'parse appId': 'chatradar',
  'parse masterKey': process.env['PARSE_MASTER_KEY'],
  'parse serverURL': process.env['PARSE_SERVER_URL'] || 'http://localhost:1337/api',

}
