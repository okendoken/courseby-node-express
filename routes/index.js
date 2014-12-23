var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function (req, res) {
    models.User
        .findAll().then(function(users) {
            res.render('list', { users: users });
    });
});

router.get('/users/:id', function(req, res) {
    models.User
        .find({ where: {id: req.params.id}})
        .complete(function(err, user) {
            if(!!err) {
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
        .destroy({ where: {id: req.params.id}})
        .then(function() {
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
        .complete(function(err, user) {
            if(!!err) {
                console.log('Ann error occured while creating the user: ' + err);
            } else {
                res.render('added', {username: req.body.username});
            }
        });
});

module.exports = router;