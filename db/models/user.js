'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
        surname: DataTypes.STRING,
        birthdate: DataTypes.STRING,
        gemus: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    }, { 
        timestamps: false
    });
    User.associate = function(models) {
    // associations can be defined here
    };
    return User;
};