/**
 * Created by Ales Drobysh on 12/20/14.
 */

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        age: DataTypes.INTEGER
    });

    return User;
};