var login = require('./login');
var signup = require('./signup');
var models = require('../../app/models');

module.exports = function(passport){
    passport.serializeUser(function(user, done) {
        done(null, user.dataValues.id);
    });
    passport.deserializeUser(function(id, done) {
        models.User
            .find({ where: { id: id } })
            .complete(
                function(err, user) {
                    done(err, user.dataValues.id);
        });
    });
    login(passport);
    signup(passport);
};