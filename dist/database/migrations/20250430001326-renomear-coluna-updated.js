"use strict";module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('fotos', 'updated', 'updated_at');
  },

  async down() {},
};
