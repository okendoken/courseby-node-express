var models = require('../app/models/index');
var should = require('chai').should();
var bcrypt = require('bcrypt');
var request = require('supertest');
var app = require('../app/app');

describe('Routes', function () {
    before(function () {
        models.sequelize.sync();
    });

    it('GET / should respond with a 302 moved temporarily, redirect ot login when unauthenticated', function (done) {
        request(app)
            .get('/')
            .expect('Content-Type', /text/)
            .expect(/login/)
            .expect(302, done);
    });

    it('GET /signup should respond with 200"', function (done) {
        request(app)
            .get('/signup')
            .expect('Content-Type', /text/)
            .expect(200, done);
    });

    it('POST /signup should respond with 302', function (done) {
        request(app)
            .post('/signup')
            .send({
                username: 'testuser',
                password: 'qwerty',
                age: 18
            }).expect('Content-Type', /text/)
            .expect(302, done);
    });

    it('GET /users/1 should respond with 200', function (done) {
        request(app)
            .get('/users/1')
            .expect('Content-Type', /text/)
            .expect(200, done);
    });

    it('GET /users/100000000000 should respond with 404 not found', function (done) {
        request(app)
            .get('/users/100000000000')
            .expect('Content-Type', /text/)
            .expect(404, done);
    });

    it('GET /signout should respond with 302 and redirect to main page', function (done) {
        request(app)
            .get('/signout')
            .expect('Content-Type', /text/)
            .expect(/\//)
            .expect(302, done);
    });

    it('GET /login should respond with 200', function (done) {
        request(app)
            .get('/login')
            .expect('Content-Type', /text/)
            .expect(200, done);
    });

    it('POST /login should respond with 302 and redirect to main page', function (done) {
        request(app)
            .post('/login')
            .send({
                username: 'testuser',
                password: 'qwerty'
            })
            .expect('Content-Type', /text/)
            .expect(/\//)
            .expect(302, done);
    });
});

describe('Models', function () {
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
                user.age.should.be.a('numeric');
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
                bcrypt.compareSync(password, user.password).should.equal(true);
            });
        });
    });

    after(function () {
        models.sequelize.drop();
    });
});