var app = require('./app/app');
var models = require('./app/models');

models.sequelize.sync().then(function() {
    var server = app.listen(app.get('port'), function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log('App listening at http://%s:%s', host, port)
    });
});