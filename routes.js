'use strict';

module.exports = function (app) {
    var control = require('./controller');
    var cors = require('cors')

    app.use(cors())
    //Default API Access
    app.route('/services').get(control.index);

    //Tambahkan list endpoint API disini
    app.route('/services/create-student').post(control.createStudent);
    app.route('/services/read-student').get(control.readStudent);
    app.route('/services/update-student').post(control.updateStudent);
    app.route('/services/delete-student').post(control.deleteStudent);
};