const mysql = require('mysql2/promise');

async function Connect() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'icl00ud',
    password: '4502',
    database: 'stashmaster'
  });

  return connection;
}

module.exports = {
  Connect
};