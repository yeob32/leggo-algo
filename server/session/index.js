/* eslint-disable new-cap */
const redis = require( 'redis' );
const session = require( 'express-session' );
const redisStore = require( 'connect-redis' )( session );

// https://github.com/tj/connect-redis

// redis session
const client = redis.createClient( 6379, '52.79.226.64' );

const redisStoreConfig = new redisStore( {
  host: '52.79.226.64',
  port: 6379,
  client,
  prefix: 'session:',
  ttl: 600,
} );

const sessionConfig = session( {
  secret: 'rds',
  store: redisStoreConfig, // redis server config
  saveUninitialized: true,
  resave: false,
} );

module.exports = sessionConfig;
