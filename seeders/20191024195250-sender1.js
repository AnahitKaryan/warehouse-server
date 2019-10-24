'use strict';

module.exports = {
     up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Senders', [{
            id: 0,
            name: 'Sender-Name',
            surname: 'Sender-Surname'
          }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Senders', null, {});
    }
};