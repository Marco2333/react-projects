// 连接MySQL
var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '283319',
    database: 'marco',
    dateStrings: true
});

function query(sql, callback) {
    pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query(sql, function (err, rows) {
            callback(err, rows);
            connection.release();//释放链接
        });
    });
}

exports.query = query;