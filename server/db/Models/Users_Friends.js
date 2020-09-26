const Sequelize = require('sequelize');

const { STRING } = Sequelize;
const { db } = require('../db');

const Users_Friends = db.define(
  'Users_Friends',
  {
    status: {
      type: STRING,
      allowNull: false,
      defaultValue: 'Pending',
    },
  },
  {
    tableName: 'Users_Friends',
  }
);

module.exports = { Users_Friends };
