var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        id:{ type: DataTypes.INTEGER, autoIncrement:true, allowNull:false, primaryKey:true},
        username: DataTypes.STRING,
        age: DataTypes.INTEGER,
        password:       {
            type: DataTypes.STRING,
            set:  function(v) {
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(v, salt);
                this.setDataValue('password', hash);
            }
        }
    });

    return User;
};