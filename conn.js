var mysql = require('mysql');

var con = mysql.createConnection({
    //Edit Configurasi Database disini
    host: "localhost",
    port: "3306",
    user: "root",
    password: "ekal1188",
    database: "sekolah_cerdas"
});

con.connect(function (err) {
    if (err) throw err;
});

module.exports = con;