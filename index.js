var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('users.db');
var express = require('express');
var app = express();

var templates = require('./templates.js');

app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.get('/', function (req, res) {
    db.all('select * from users', function(err, users){
        res.send(templates.layout(templates.list(users)))
    })
});

app.get('/create', function (req, res) {
    res.send(templates.layout(templates.add()))
});

app.get('/delete/:id', function (req, res) {
    db.run('delete from users where id = ' + req.params.id, function(){
        res.send(templates.layout('<p>User Deleted!</p>' +
        '<a href="/">Users list</a> '))
    })
});

app.post('/add', function (req, res) {
    db.run('insert into users(username, password, age) values("'+
    req.body.username +'","' +
    req.body.password +'",' +
    req.body.age+')', function(){
        res.send(templates.layout('<p>User Added!</p>' +
        '<a href="/">Users list</a> '))
    })
});

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port)

});