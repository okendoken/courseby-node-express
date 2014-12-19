var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('users.db');
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.get('/', function (req, res) {
    db.all('select * from users', function(err, users) {
        res.render('list', {users : users});
    });
});

app.get('/users/:id', function(req, res) {
    db.each('select * from users where id = ' + req.params.id, function(err, user) {
        res.render('profile', {user: user});
    });
});

app.get('/create', function (req, res) {
    res.render('create');
});

app.get('/delete/:id', function (req, res) {
    db.run('delete from users where id = ' + req.params.id, function(){
        res.render('deleted');
    })
});

app.post('/add', function (req, res) {
    db.run('insert into users(username, password, age) values("'+
    req.body.username +'","' +
    req.body.password +'",' +
    req.body.age+')', function(){
        res.render('added', {username: req.body.username});
    })
});

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port)

});