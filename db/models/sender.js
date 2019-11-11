'use strict';
module.exports = (sequelize, DataTypes) => {
    const Sender = sequelize.define('Sender', {
        name: DataTypes.STRING,
        surname: DataTypes.STRING
    }, { 
        timestamps: false
    });
    Sender.associate = function(models) {
    // associations can be defined here
    };
    return Sender;
};