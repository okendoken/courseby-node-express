var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);
app.set('env',  process.env.NODE_ENV || 'development');

app.use(express.static(__dirname + '/../public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

var routes = require('./routes/index');
app.use('/', routes);

module.exports = app;