var express = require('express');
var app = express();
var models = require("./models");

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

var routes = require('./routes/index');
app.use('/', routes);

app.set('port', process.env.PORT || 3000);

models.sequelize.sync().then(function() {
    var server = app.listen(app.get('port'), function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log('Example app listening at http://%s:%s', host, port)
    });
});