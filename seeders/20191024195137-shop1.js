'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Shops', [{
            id: 0,
            name: 'My-good-shop',
            status: 'Good'
          }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Shops', null, {});
    }
};