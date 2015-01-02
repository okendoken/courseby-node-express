var models = require('../app/models/index');
var should = require('chai').should();
var bcrypt = require('bcrypt');

describe('Models', function () {
    before(function () {
        models.sequelize.sync();
    });

    describe('User', function () {
        it('must have numeric id', function () {
            models.User.create({
                username: 'testuser',
                password: 'testpassword',
                age: 18
            }).complete(function (err, user) {
                user.id.should.be.a('number');
            })
        });

        it('must have string username', function () {
            models.User.find({
                where: {username: 'testuser'}
            }).complete(function (err, user) {
                user.username.should.be.a('string');
            });
        });

        it('must have string password', function () {
            models.User.find({
                where: {username: 'testuser'}
            }).complete(function (err, user) {
                user.password.should.be.a('string');
            });
        });

        it('must contain inputted username', function () {
            models.User.find({
                where: {username: 'testuser'}
            }).complete(function (err, user) {
                user.username.should.equal('testuser');
            });
        });

        it('must have numeric age', function () {
            models.User.find({
                where: {username: 'testuser'}
            }).complete(function (err, user) {
                user.age.should.be.a('number');
            });
        });

        it('must have inputted age', function () {
            models.User.find({
                where: {username: 'testuser'}
            }).complete(function (err, user) {
                user.age.should.equal(18);
            });
        });

        it('must contain encrypted password', function () {
            models.User.find({
                where: {username: 'testuser'}
            }).complete(function (err, user) {
                bcrypt.compareSync('testpassword', user.password).should.equal(true);
            });
        });
    });

    after(function () {
        models.sequelize.drop();
    });
});