var models  = require('../models');
var express = require('express');
var passport = require('passport');
var router  = express.Router();

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};

router.get('*', function(req, res, next) {
    res.locals.user = req.user || null;
    next();
});

router.get('/', isAuthenticated, function (req, res) {
    res.redirect('/users/' + req.user);
});

router.get('/users/:id', function (req, res) {
    models.User
        .find({where: {id: req.params.id}})
        .complete(function (err, user) {
            if (!!err) {
                console.log('An error occured while searching the user:' + err);
            } else if (!user) {
                console.log('No user with id ' + req.params.id + ' has been found.');
            } else {
                res.render('profile', {user: user});
            }
        });
});

router.get('/create', function (req, res) {
    res.render('create');
});

router.get('/delete/:id', function (req, res) {
    models.User
        .destroy({where: {id: req.params.id}})
        .then(function () {
            res.render('deleted');
        });
});

router.post('/add', function (req, res) {
    models.User
        .create({
            username: req.body.username,
            password: req.body.password,
            age: req.body.age
        })
        .complete(function (err, user) {
            if (!!err) {
                console.log('Ann error occured while creating the user: ' + err);
            } else {
                res.render('added', {username: req.body.username});
            }
        });
});

router.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true
}));

router.get('/login', function(req, res) {
    res.render('login', {message: req.flash('message')});
});

/* GET Registration Page */
router.get('/signup', function (req, res) {
    res.render('signup', {message: req.flash('message')});
});

router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/home', isAuthenticated, function (req, res) {
    console.log(req.user);
    res.redirect('/users/' + req.user);
});

router.get('/signout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;