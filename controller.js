'use strict';

var response = require('./res');
var connection = require('./conn');

const perf = require('execution-time')();
var dateFormat = require('dateformat');
var datetime = require('node-datetime');

var dt = datetime.create();
var status_code = "";
var messages = "";
var elapseTime = "";
var time = "";

exports.index = function (req, res) {
    response.ok("403 Forbidden (You don't have permission to access this API)", res)
};

exports.createStudent = function (req, res) {
    perf.start();
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/create-student"); // Ganti Endpoint API disini
    console.log("body sent : ");
    console.log(req.body);

    //Ganti Query disini dan sesuaikan parameter dengan values yang akan di insert
    var sql = `INSERT INTO sekolah_cerdas.siswa (
        nama_siswa,
        tempat_lahir_siswa,
        tanggal_lahir_siswa,
        jenis_kelamin_siswa,
        alamat_siswa,
        orang_tua_siswa,
        created_by,
        created_date
      ) 
      VALUES
        (
          '`+ req.body.nameStudent + `',
          '`+ req.body.placeOfBirthStudent + `',
          '`+ req.body.dateOfBirthStudent + `',
          '`+ req.body.genderStudent + `',
          '`+ req.body.addressStudent + `',
          '`+ req.body.parentsStudent + `',
          'system',
          NOW()
        ) ;`;
    // console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++");
    // console.log(sql);
    // console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++");

    connection.query(sql, function (error, result, fields) {
        if (error) {
            status_code = "500"
            messages = "Internal server error";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.error(status_code, time, messages, error, res);
        } else {
            status_code = "200";
            messages = "Success";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.successPost(status_code, time, messages, res);
        }
    });
};

exports.readStudent = function (req, res) {
    perf.start();
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/read-student"); // Ganti Endpoint API disini
    console.log("body sent : ");
    console.log(req.body);

    var condition = "";

    if (req.body.idStudent != null || req.body.idStudent != undefined) {
        condition = " AND id_siswa = " + req.body.idStudent;
    }
    var sql = `SELECT 
        id_siswa,
        nama_siswa,
        tempat_lahir_siswa,
        tanggal_lahir_siswa,
        jenis_kelamin_siswa,
        alamat_siswa,
        orang_tua_siswa,
        created_by,
        created_date,
        updated_by,
        updated_date 
     FROM
        sekolah_cerdas.siswa
     WHERE 1=1  
       `+ condition + `;`;

    // console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++");
    // console.log(sql);
    // console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++");

    connection.query(sql, function (error, result, fields) {
        if (error) {
            status_code = "500"
            messages = "Internal server error";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.error(status_code, time, messages, error, res);
        } else {
            result.forEach(element => {
                element.tanggal_lahir_siswa = dateFormat(element.tanggal_lahir_siswa, "dd mmmm yyyy");
                element.created_date = dateFormat(element.created_date, "dd mmmm yyyy HH:MM:ss");
            })
            status_code = "200";
            messages = "Success";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.successGet(status_code, time, messages, result, res);
        }
    });
};

exports.updateStudent = function (req, res) {
    perf.start();
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/create-student"); // Ganti Endpoint API disini
    console.log("body sent : ");
    console.log(req.body);

    var condition = "";

    //Ganti Query disini dan sesuaikan parameter dengan values yang akan di insert
    if (req.body.idStudent != null || req.body.idStudent != undefined) {
        condition = " AND id_siswa = " + req.body.idStudent;
    }
    var sql = `UPDATE 
        sekolah_cerdas.siswa 
     SET
        nama_siswa = '`+ req.body.nameStudent + `',
        tempat_lahir_siswa = '`+ req.body.placeOfBirthStudent + `',
        tanggal_lahir_siswa = '`+ req.body.dateOfBirthStudent + `',
        jenis_kelamin_siswa = '`+ req.body.genderStudent + `',
        alamat_siswa = '`+ req.body.addressStudent + `',
        orang_tua_siswa = '`+ req.body.parentsStudent + `',
        updated_by = 'system',
        updated_date = NOW() 
     WHERE 1 = 1
     `+ condition + `;`;

    // console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++");
    // console.log(sql);
    // console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++");

    connection.query(sql, function (error, result, fields) {
        if (error) {
            status_code = "500"
            messages = "Internal server error";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.error(status_code, time, messages, error, res);
        } else {
            status_code = "200";
            messages = "Success";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.successPost(status_code, time, messages, res);
        }
    });
};

exports.deleteStudent = function (req, res) {
    perf.start();
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/create-student"); // Ganti Endpoint API disini
    console.log("body sent : ");
    console.log(req.body);

    var condition = "";

    //Ganti Query disini dan sesuaikan parameter dengan values yang akan di insert
    if (req.body.idStudent != null || req.body.idStudent != undefined) {
        condition = " AND id_siswa = " + req.body.idStudent;
    }

    var sql = `DELETE 
        FROM
            sekolah_cerdas.siswa 
        WHERE 1 = 1 
        `+ condition + `;`;

    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++");
    console.log(sql);
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++");

    connection.query(sql, function (error, result, fields) {
        if (error) {
            status_code = "500"
            messages = "Internal server error";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.error(status_code, time, messages, error, res);
        } else {
            status_code = "200";
            messages = "Success";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.successPost(status_code, time, messages, res);
        }
    });
};