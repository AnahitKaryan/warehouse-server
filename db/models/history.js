'use strict';
module.exports = (sequelize, DataTypes) => {
    const History = sequelize.define('History', {
        name: DataTypes.STRING,
        type: DataTypes.STRING,
        constly: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        status: DataTypes.STRING,
        date1: DataTypes.STRING,
        date2: DataTypes.STRING,
        priority: DataTypes.INTEGER,
        sender: DataTypes.STRING,
        shop: DataTypes.STRING,
        exportDate: DataTypes.STRING
    }, { 
        timestamps: false
    }
    );
    History.associate = function(models) {
    // associations can be defined here
    };
    return History;
};