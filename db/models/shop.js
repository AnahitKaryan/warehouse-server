'use strict';

module.exports = (sequelize, DataTypes) => {
    const Shop = sequelize.define('Shop', {
        name: DataTypes.STRING,
        status: DataTypes.STRING
    }, { 
        timestamps: false
    });
    Shop.associate = function(models) {
    // associations can be defined here
     };
    return Shop;
};