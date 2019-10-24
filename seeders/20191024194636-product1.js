'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Products', [{
            id: 0,
            name: 'Coca-cola',
            type: 'Beverage',
            constly: 500,
            price: 550,
            quantity: 10,
            status: 'Is useful',
            date1: '2015-02-03',
            date2: '2015-04-03',
            priority: 5
          }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Products', null, {});
    }
};
