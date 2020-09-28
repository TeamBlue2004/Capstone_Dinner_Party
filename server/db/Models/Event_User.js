const Sequelize = require('sequelize');

const { STRING } = Sequelize;
const { db } = require('../db');

const Event_User = db.define(
  'Event_User',
  {
    status: {
      type: STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'Event_User',
  }
);

module.exports = { Event_User };
