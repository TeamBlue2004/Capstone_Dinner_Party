const Sequelize = require('sequelize');

const { BOOLEAN } = Sequelize;
const { db } = require('../db');

const User_Recipe = db.define(
  'User_Recipe',
  {
    favorite: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: 'User_Recipe',
  }
);

module.exports = { User_Recipe };
