'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Products', {
            id: {
                allowNull: false,
                autoIncrement: false,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            type: {
                type: Sequelize.STRING
            },
            constly: {
                type: Sequelize.INTEGER
            },
            price: {
                type: Sequelize.INTEGER
            },
            quantity: {
                type: Sequelize.INTEGER
            },
            status: {
                type: Sequelize.STRING
            },
            date1: {
                type: Sequelize.STRING
            },
            date2: {
                type: Sequelize.STRING
            },
            priority: {
                type: Sequelize.INTEGER
            }
            });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Products');
    }
};