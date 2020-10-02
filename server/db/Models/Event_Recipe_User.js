const Sequelize = require('sequelize');

const { UUID, UUIDV4 } = Sequelize;
const { db } = require('../db');

const Event_Recipe_User = db.define(
  'Event_Recipe_User',
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
  },
  {
    tableName: 'Event_Recipe_User',
  }
);

module.exports = { Event_Recipe_User };
