require('dotenv').config({ silent: true });

import * as joi from 'joi';

const schema = joi.object({
  NODE_ENV: joi.string().allow(['development', 'production']).default('production'),
  LOG_LEVEL: joi.string().allow(['debug', 'info', 'warn', 'error']).default('info'),
  WEB_PORT: joi.number().default(1337),
  PARSE_MONGODB: joi.string().default('mongodb://localhost:27017/chatradar'),
  PARSE_MASTER_KEY: joi.string().required(),
  PARSE_SERVER_URL: joi.string().default('http://localhost:1337/api'),
});

const { error: err, value: env } = joi.validate(process.env, schema.unknown().required());

if (err) throw new Error(`Config validation error: ${err.message}`);

export = {

  'logger console level': env.LOG_LEVEL,

  'web port': env.WEB_PORT,

  'parse databaseURI': env.PARSE_MONGODB,
  'parse appName': 'Chat Radar',
  'parse appId': 'chatradar',
  'parse masterKey': env.PARSE_MASTER_KEY,
  'parse serverURL': env.PARSE_SERVER_URL,

};
