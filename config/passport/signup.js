var LocalStrategy = require('passport-local').Strategy;
var models = require('../../app/models');

module.exports = function(passport) {
    passport.use('signup', new LocalStrategy({
                passReqToCallback: true
            },
            function (req, username, password, done) {
                var findOrCreateUser = function () {
                    models.User
                        .find({where: {'username': username}})
                        .complete(
                            function (err, user) {
                                if (err) {
                                    console.log('Error in SignUp: ' + err);
                                    return done(err);
                                }
                                if (user) {
                                    console.log('User already exists with username: ' + username);
                                    return done(null, false, req.flash('message', 'User Already Exists'));
                                } else {
                                    models.User.create({
                                        username: username,
                                        password: password,
                                        age: req.body.age
                                    }).complete(function (err, user) {
                                        if (err) {
                                            console.log('Error in Saving user: ' + err);
                                            throw err;
                                        }
                                        console.log('User Registration succesful');
                                        return done(null, user);
                                    });
                                }
                            });
                };
                process.nextTick(findOrCreateUser);
            })
    );
};