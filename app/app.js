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

var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey',
                        saveUninitialized: true,
                        resave: true}));
app.use(passport.initialize());
app.use(passport.session());

var flash = require('connect-flash');
app.use(flash());

var initPassport = require('../config/passport/init');
initPassport(passport);

var routes = require('./routes/index');
app.use('/', routes);

module.exports = app;