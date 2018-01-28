'use strict';

const Env = use('Env');
const Helpers = use('Helpers');

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Default Connection
  |--------------------------------------------------------------------------
  |
  | Connection defines the default connection settings to be used while
  | interacting with SQL databases.
  |
  */
  connection: Env.get('DB_CONNECTION', 'sqlite'),

  /*
  |--------------------------------------------------------------------------
  | Sqlite
  |--------------------------------------------------------------------------
  |
  | Sqlite is a flat file database and can be good choice under development
  | environment.
  |
  | npm i --save sqlite3
  |
  */
  sqlite: {
    client: 'sqlite3',
    connection: {
      filename: Helpers.databasePath(`${Env.get('DB_DATABASE', 'development')}.sqlite`)
    },
    useNullAsDefault: true,
    debug: Env.get('DB_DEBUG', false)
  },

  /*
  |--------------------------------------------------------------------------
  | MySQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for MySQL database.
  |
  | npm i --save mysql
  |
  */
  // mysql: {
  //   client: 'mysql',
  //   connection: {
  //     host: Env.get('DB_HOST', 'localhost'),
  //     port: Env.get('DB_PORT', ''),
  //     user: Env.get('DB_USER', 'root'),
  //     password: Env.get('DB_PASSWORD', ''),
  //     database: Env.get('DB_DATABASE', 'adonis')
  //   },
  //   debug: Env.get('DB_DEBUG', false)
  // },

  // mysql://:@/?reconnect=true

  mysql: {
    client: 'mysql',
    connection: {
      host: Env.get('DB_HOST', 'us-cdbr-iron-east-05.cleardb.net'),
      port: Env.get('DB_PORT', ''),
      user: Env.get('DB_USER', 'b053facd3627d8'),
      password: Env.get('DB_PASSWORD', 'c08bd69e'),
      database: Env.get('DB_DATABASE', 'heroku_fee0d34304fdd7a')
    },
    debug: Env.get('DB_DEBUG', false)
  },

  /*
  |--------------------------------------------------------------------------
  | PostgreSQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for PostgreSQL database.
  |
  | npm i --save pg
  |
  */
  pg: {
    client: 'pg',
    connection: {
      host: Env.get('DB_HOST', 'localhost'),
      port: Env.get('DB_PORT', ''),
      user: Env.get('DB_USER', 'root'),
      password: Env.get('DB_PASSWORD', ''),
      database: Env.get('DB_DATABASE', 'adonis')
    },
    debug: Env.get('DB_DEBUG', false)
  }
};
