var mysql = require('mysql');
var pool = mysql.createPool({
    multipleStatements: true,
    connectionLimit: 200,
    port: '3306',
    host: 'projectli-instance.cz8fkapsud6o.us-east-2.rds.amazonaws.com',
    user: "admin",
    password: "admin123",
    database : "projectli"
})

module.exports = pool;