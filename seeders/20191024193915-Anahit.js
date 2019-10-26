'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
            id: 0,
            name: 'Anahit',
            surname: 'Karyan',
            birthdate: '1996-02-03',
            gemus: 'female',
            email: 'demo@demo.com',
            password: 'aaaaa'
          }], {});
     },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};