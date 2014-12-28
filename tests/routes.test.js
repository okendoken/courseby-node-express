var request = require('supertest');
var app = require('../app/app');
var models = require('../app/models');


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

    after(function() {
        models.sequelize.drop();
    });
});