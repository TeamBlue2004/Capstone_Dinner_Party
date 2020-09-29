const Sequelize = require('sequelize');

const { UUID, UUIDV4, ENUM } = Sequelize;
const { db } = require('../db');

const values = ['appetizer', 'entree', 'dessert'];

const Event_Recipe = db.define(
  'Event_Recipe',
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      autoincrement: true,
    },
    userId: {
      type: UUID,
      defaultValue: UUIDV4,
    },
    dish: {
      type: ENUM,
      values,
    },
  },
  {
    tableName: 'Event_Recipe',
  }
);

module.exports = { Event_Recipe };
