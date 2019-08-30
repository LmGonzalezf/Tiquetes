var pg = require('pg');
var pool ;
var config = {
    user: 'postgres',
    host: 'localhost',
    database: 'TaquillaV2',
    password: 'lucho8540',
    port: 5432,
    max: 10,
  idleTimeoutMillis: 30000,
  }

  module.exports = {
    getPool: function () {
      if (pool) return pool; // if it is already there, grab it here
      pool = new pg.Pool(config);
      return pool;
}
  }