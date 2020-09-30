const Sequelize = require('sequelize');

const { ENUM } = Sequelize;
const { db } = require('../db');

const values = ['appetizer', 'entree', 'dessert'];

const Event_Recipe = db.define(
  'Event_Recipe',
  {
    dish: {
      type: ENUM,
      values,
      allowNull: false,
    },
  },
  {
    tableName: 'Event_Recipe',
  }
);

module.exports = { Event_Recipe };
