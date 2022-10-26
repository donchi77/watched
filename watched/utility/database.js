const mysql = require('mysql2');

module.exports = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'l3Che98Ie19!#dkfs',
    database: 'pwmdb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});