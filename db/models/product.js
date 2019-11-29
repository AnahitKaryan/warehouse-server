'use strict';
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        name: DataTypes.STRING,
        type: DataTypes.STRING,
        constly: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        status: DataTypes.STRING,
        date1: DataTypes.STRING,
        date2: DataTypes.STRING,
        priority: DataTypes.INTEGER
    }, { 
        timestamps: false
    }
    );
    Product.associate = function(models) {
    // associations can be defined here
    };
    return Product;
};