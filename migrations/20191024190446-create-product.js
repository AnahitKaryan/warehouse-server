'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Products', {
            id: {
                allowNull: false,
                autoIncrement: true,
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
                type: Sequelize.STRING
            },
            prices: {
                type: Sequelize.STRING
            },
            quantity: {
                type: Sequelize.STRING
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
                type: Sequelize.STRING
            }
            });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Products');
    }
};