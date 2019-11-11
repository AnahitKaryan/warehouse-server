'use strict';
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        name: DataTypes.STRING,
        type: DataTypes.STRING,
        constly: DataTypes.STRING,
        prices: DataTypes.STRING,
        quantity: DataTypes.STRING,
        status: DataTypes.STRING,
        date1: DataTypes.STRING,
        date2: DataTypes.STRING,
        priority: DataTypes.STRING
    }, { 
        timestamps: false
    }
    );
    Product.associate = function(models) {
    // associations can be defined here
    };
    return Product;
};