var LocalStrategy = require('passport-local').Strategy;
var models = require('../../app/models');
var bcrypt = require('bcrypt');

module.exports = function(passport){
    passport.use('login', new LocalStrategy({
                passReqToCallback : true
            },
            function(req, username, password, done) {
                models.User
                    .find({ where: { 'username' : username } })
                    .complete(
                        function(err, user) {
                            if (err)
                                return done(err);
                            if (!user){
                                console.log('User Not Found with username ' + username);
                                return done(null, false, req.flash('message', 'User Not found.'));
                            }
                            if (!isValidPassword(user, password)){
                                console.log('Invalid Password');
                                return done(null, false, req.flash('message', 'Invalid Password'));
                            }
                            return done(null, user);
                        }
                );
            })
    );
    var isValidPassword = function(user, password){
        return bcrypt.compareSync(password, user.password);
    }
};