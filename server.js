var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000, //Edit port sesuaikan dengan kebutuhan, contoh : 3000
    bodyParser = require('body-parser'),
    controller = require('./controller');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var routes = require('./routes');
routes(app);

app.listen(port);
console.log('RESTful API server started on: ' + port);